import React, { useEffect, useState } from 'react';
import { TiDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { wordToNumber } from './constant'
import { FaMicrophone } from "react-icons/fa6";



function VoiceInputForm() {
    const [orderDetails, setOrderDetails] = useState([{ id: 0, productName: '', productCount: '' }]);
    const [index, setIndex] = useState(0);
    const [voice, setVoice] = useState('')
    const [products, setProducts] = useState(['samosa', 'burger', 'pizza'])
    const [quantity, setQuantity] = useState(['ek', 'do', 'tin', 'char', 'pach', 'one', 'two', 'three', 'four', 'five'])

    // voice input handling code below
    useEffect(() => {
        console.log(orderDetails)
    }, [orderDetails])


    //function for recoding voice and convet into sentence
    async function startSpeechRecognition() {
        return new Promise((resolve, reject) => {
            // Check if browser supports SpeechRecognition
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

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

                recognition.start();
            } else {
                reject(new Error('Speech recognition not supported'));
            }
        });
    }

    // finding min distance to convert 1 word to other.
    function levenshteinDistance(word1, word2) {
        const m = word1.length;
        const n = word2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i === 0) {
                    dp[i][j] = j;
                } else if (j === 0) {
                    dp[i][j] = i;
                } else if (word1[i - 1] === word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }

        return dp[m][n];
    }

    //pass input_word and each product or quantity item as wordList 
    function findMostSimilarWord(word1, WordList) {

        for (let i = 0; i < WordList.length; i++) {
            let word2 = WordList[i];
            let threshold;

            const distance = levenshteinDistance(word1, word2.toLowerCase());

            if (word1.length > word2.length) {
                threshold = Math.floor(word1.length / 2);
            }
            else {
                threshold = Math.floor(word2.length / 2)
            }

            if (distance <= threshold) {
                return word2;
            }
        }
    }

    //finding similar word for quantity
    async function getQuantity(voice) {
        const inputWords = voice.split(" ");
        let quantity_array = [];

        for (let i = 0; i < inputWords.length; i++) {
            let word = inputWords[i];
            if (!isNaN(word)) {
                quantity_array.push(parseInt(word, 10));
            } else {
                const matchedQuantity = await findMostSimilarWord(word, quantity);
                if (matchedQuantity !== undefined) {
                    quantity_array.push(matchedQuantity);
                }
            }
        }

        // Assuming wordToNumber is available in the scope
        quantity_array = quantity_array.map(item => {
            if (isNaN(item)) {
                const number = wordToNumber[item];
                return number === undefined ? 0 : number;
            } else {
                return item;
            }
        });

        return quantity_array;
    }

    //finding similar words for product.
    async function printSimilarWords(voice) {
        const inputWords = voice.toLowerCase().split(" ");
        const mostSimilarWord = [];

        for (let i = 0; i < inputWords.length; i++) {
            const matchWord = await findMostSimilarWord(inputWords[i], products);
            if (matchWord !== undefined) {
                mostSimilarWord.push(matchWord);
            }
        }
        return mostSimilarWord;
    }


    async function voiceOrder() {
        try {
            const utterance = new SpeechSynthesisUtterance("apko kya order karna hai");
            // const utterance = new SpeechSynthesisUtterance("what you like to place an order for");

            window.speechSynthesis.speak(utterance);
            const transcriptResult = await startSpeechRecognition();
            // const transcriptResult = '2 samosa tin pizza'
            const mostSimilarWords = await printSimilarWords(transcriptResult);
            const inputQuantity = await getQuantity(transcriptResult);
            // updateVoiceOrder(mostSimilarWords, inputQuantity);
        } catch (error) {
            console.error('Error with speech recognition:', error);
        }
    }
 

    return (

        <div className='mb-2' style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ margin: '0' }}>Press Mic</h3>
        <button className="mb-2 bg-white" style={{ border: 'none', marginLeft: '20px' }} onClick={voiceOrder}>
            <FaMicrophone style={{ color: "red", fontSize: "30px" }} />
        </button>
    </div>
    );
}

export default VoiceInputForm;
