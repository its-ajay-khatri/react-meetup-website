// ourdomain.com/new-meetup/
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {

    async function addMeetupHandler(enteredMeetupData) {
        const response =  await fetch('/api/new-meetup', {                     //api/new-meetup/index.js
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),                   //object to json
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();

        console.log(data);
    }

    return(
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta 
                    name="description"
                    content="add your own meetups and create amazing oppurtunities"
                />
            </Head>
            <NewMeetupForm onAddMeetup = {addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage;