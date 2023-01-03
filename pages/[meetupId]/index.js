import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return(
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta 
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}                //meetupdata given below getStaticProps, hence using this function, we can create props of particular component in the same file
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}


export async function getStaticPaths(){

    //mostly to fetch usel(ObjectId="63752581654a049737248ac3")

    const client = await MongoClient.connect('mongodb+srv://mongoadmin:kKXJKjZywgAUGDgL@cluster0.rs3k4vd.mongodb.net/meetups?retryWrites=true&w=majority');
        
    const db = client.db();      //if the database named meetups is not created, then it will create one

    const meetupsCollection = db.collection('meetups');       //connection done

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();        //({}) means give me all the objects, _id:1 means data will be fetch with old _id field

    client.close();

    return{
        fallback: false,              //allows you to generate some of your pages for specific meetupId values
        paths: meetups.map(meetup =>({ 
            params: { meetupId: meetup._id.toString() },
     })),
    }
}


export async function getStaticProps(context){          //this function is used to define props of an compoent in the same file of that component, function name must ne same "getStaticProps", use to set props for the current component

    //fetch data for single meetup(single detail page)
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://mongoadmin:kKXJKjZywgAUGDgL@cluster0.rs3k4vd.mongodb.net/meetups?retryWrites=true&w=majority');
        
    const db = client.db();      //if the database named meetups is not created, then it will create one

    const meetupsCollection = db.collection('meetups');       //connection done

    const selectedMeetup = await meetupsCollection.findOne({                 //will finds an single meetup
        _id: ObjectId(meetupId),                   //string to object, object is that Object id in that particular entry of mongo db _id: ObjectId("63752581654a049737248ac3")
    });         
    
    client.close();

    return{
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;