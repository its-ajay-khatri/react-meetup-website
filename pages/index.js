import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList'

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A first Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some Address 5, 12345 Some City',
//         description: 'This is our first Meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some Address 10, 12345 Some City',
//         description: 'This is our Second Meetup!'
//     }
// ]

function Homepage(props) {

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name="description"
                    content="Browse a huge list of highly active react meetups"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;

//     return{
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps(){       //function name must ne same "getStaticProps", use to set props for the current component
    
    //meetup listing page or homepage, fetch data here

    const client = await MongoClient.connect('mongodb+srv://mongoadmin:kKXJKjZywgAUGDgL@cluster0.rs3k4vd.mongodb.net/meetups?retryWrites=true&w=majority');
        
    const db = client.db();      //if the database named meetups is not created, then it will create one

    const meetupsCollection = db.collection('meetups');            //connection done

    const meetups = await meetupsCollection.find().toArray();           //meetups will be an array

    client.close();


    return{
        props:{                               // this props object must be there with same format "props"
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),                      //object to string
            }))
        },
        revalidate: 10                        // will wait until 10 seconds when the data will revalidates for the page 
    }
}

export default Homepage;