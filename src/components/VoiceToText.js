
import React, { useState } from 'react'

function VoiceToText() {
    const[voice,setVoice] = useState('')

    console.log(voice)


    function startSpeechRecognition() {

        return new Promise((resolve, reject) => {
            // Check if browser supports SpeechRecognition
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                // Create SpeechRecognition object
                let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                let recognition = new SpeechRecognition();

                // Set recognition parameters
                recognition.continuous = false; // Stop listening after first speech input
                recognition.lang = 'en-US'; // Set language

                // Define event handlers
                recognition.onresult = function (event) {
                    let transcriptResult = event.results[0][0].transcript;
                    console.log('You said: ' + transcriptResult);
                    setVoice(transcriptResult); // Update the state with the transcript
                    resolve(transcriptResult); // Reso
                };

                recognition.onerror = function (event) {
                    console.error('Speech recognition error:', event.error);
                    reject(event.error); // Reject the promise with error
                };

                recognition.onend = function () {
                    console.log('Speech recognition ended.');
                };

                // Start recognition
                recognition.start();
            } else {
                console.error('Speech recognition not supported in this browser.');
                // reject(new Error('Speech recognition not supported'));
            }
        });
    }

    return (
        <div>
            <button onClick={startSpeechRecognition}>start Recording</button>
        </div>
    )
}

export default VoiceToText