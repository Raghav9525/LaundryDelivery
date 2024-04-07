import { React, useEffect, useState } from 'react'
import { wordToNumber } from './constant';
import { wordPairs } from './constant'
import { TiDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { Collapse } from 'bootstrap';
import { FaMicrophone } from "react-icons/fa6";

import { clothingPrices } from './constant'
import { products } from './constant';
import { useNavigate } from 'react-router-dom';

function OrderByVoice() {
    const apiUrl = process.env.REACT_APP_SERVER_URL;

    const [orderDetails, setOrderDetails] = useState([{ rowid: 0, category: '', productName: '', workType: '', productCount: '' }]);
    const [category, setCategory] = useState()
    const [voice, setVoice] = useState('')
    const [custMob, setCustMob] = useState('')

    const [mostSimilarWords, setMostSimilarWords] = useState([])
    // const [quantity, setQuantity] = useState([ 'ekk','doo','teen','charr','paach','ones', 'to', 'threee', 'fourr', 'fives'])
    const [quantity, setQuantity] = useState([])

    const [inputQuantity, setInputQuantity] = useState([])
    const [index, setIndex] = useState(0);

    // states to display cloths in select tag
    const [men, setMen] = useState([]);
    const [women, setWomen] = useState([]);
    const [home, setHome] = useState([]);

    const navigate = useNavigate()


    const filterClothingByType = () => {
        const menClothing = clothingPrices.filter(item => item.type === "men").map(item => item.name);;
        const womenClothing = clothingPrices.filter(item => item.type === "women").map(item => item.name);;
        const homeClothing = clothingPrices.filter(item => item.type === "home").map(item => item.name);;

        setMen(menClothing);
        setWomen(womenClothing);
        setHome(homeClothing);

    };

    // Call the filter function when the component mounts
    useEffect(() => {
        filterClothingByType();
    }, []);

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


    const handleInputChange = (index, field, value) => {
        const newOrderDetails = [...orderDetails];
        const orderIndex = newOrderDetails.findIndex(order => order.rowid === index);
        newOrderDetails[orderIndex][field] = value;
        setOrderDetails(newOrderDetails);
    };

    const handleAddRow = (e) => {
        e.preventDefault();
        let newId = index + 1;
        setOrderDetails([{ rowid: newId, category: '', productName: '', workType: '', productCount: '' }, ...orderDetails]);
        setIndex(newId);
    };

    const handleDeleteRow = (rowid) => {
        setOrderDetails(orderDetails.filter(order => order.rowid !== rowid));
    };

    const cardStyle = {
        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    };



    //pass input_word and each product or quantity item as wordList 
    function findMostSimilarWord(word1, wordList) {
        let similarWordMap = new Map(); // Use a Map to store words and their distances

        for (let i = 0; i < wordList.length; i++) {
            let word2 = wordList[i];
            let threshold;
            const distance = levenshteinDistance(word1, word2.toLowerCase());
            if (word1.length > word2.length) {
                threshold = Math.floor(word1.length / 2);
            } else {
                threshold = Math.floor(word2.length / 2);
            }

            if (distance <= threshold) {
                similarWordMap.set(word2, distance); // Store word and its distance
            }
        }
        // Find the word with the minimum distance
        let similarWord = null;
        let minDistance = Infinity;
        for (let [word, distance] of similarWordMap) {
            if (distance < minDistance) {
                similarWord = word;
                minDistance = distance;
            }
        }
        return similarWord; // Return the word with the minimum distance
    }


    //finding similar words for product.
    async function printSimilarWords(voice) {

        const inputWords = voice.toLowerCase().split(" ");
        const mostSimilarWord = [];

        for (let i = 0; i < inputWords.length; i++) {
            const matchWord = findMostSimilarWord(inputWords[i], products)

            if (matchWord !== undefined) {
                mostSimilarWord.push(matchWord);
            }
        }
        setMostSimilarWords(prevState => [...prevState, ...mostSimilarWord]);
        return mostSimilarWord; // Return the array
    }

    function generateSentence(words) {
        return words.join(' ');
    }

    function removeSpacesInPairs(sentence) {
        // Replace spaces in defined word pairs
        Object.keys(wordPairs).forEach(pair => {
            // Replace the pair with its concatenated form in the sentence
            sentence = sentence.replace(new RegExp(pair, 'g'), wordPairs[pair]);
        });
        return sentence;
    }



    function findCategory(clothName) {
        const category = [];
        // Check each word against men and women categories
        for (let i = 0; i < clothName.length; i++) {
            const word = clothName[i].toLowerCase(); // Convert to lowercase for case-insensitive comparison
            if (men.includes(word)) {
                category.push('men');
            } else if (women.includes(word)) {
                category.push('women');
            } else {
                category.push('');
            }
        }
        setCategory(category);
        // Return the array containing categories
        return category;
    }

    //finding similar word for quantity
    async function getQuantity(voice) {
        const inputWords = voice.split(" ");
        let quantity_array = [];

        for (let i = 0; i < inputWords.length; i++) {
            let item = inputWords[i];
            const number = wordToNumber[item];

            if (!isNaN(item)) {
                quantity_array.push(parseInt(item, 10));
            }

            // if number found
            if (number !== undefined) {
                quantity_array.push(number);
            }
        }
        console.log("quantity_array")
        console.log(quantity_array);
        // setQuantity(quantity_array);

        return quantity_array;
    }

    function getClothName(voice) {
        const inputWords = voice.split(" ");
        for (let i = 0; i < inputWords.length; i++) {
            let item = inputWords[i];
            const number = wordToNumber[item];
            console.log("number", number)

            // if number found
            if (number !== undefined || !isNaN(item)) {
                // remove number from inputWords
                inputWords.splice(i, 1);
                i--; // adjust index to account for the removed element
            }
        }
        return inputWords;
    }


    async function voiceOrder() {
        try {
            const utterance = new SpeechSynthesisUtterance("laundry detail boleea");
            window.speechSynthesis.speak(utterance);

            // const transcriptResult = 'designer sherwani 3 t-shirt 4';
            // const utterance = new SpeechSynthesisUtterance("what you like to place an order for");

            const transcriptResult = await startSpeechRecognition();
            console.log(transcriptResult)
            const mostSimilarWords = await printSimilarWords(transcriptResult);
            const sentence = generateSentence(mostSimilarWords);

            // convert "half sleev" to "halfsleev"
            const processedVoice = removeSpacesInPairs(sentence)
            console.log("processedVoice ", processedVoice)


            //find quantity and remove from processVoice
            const quantity = await getQuantity(processedVoice);
            console.log("quantity yyy")
            console.log(quantity)

            //convert processVoice into array of words
            const clothNames = await getClothName(processedVoice)
            console.log("clothNames")
            console.log(clothNames)

            //find category mens,women etc
            const category = findCategory(clothNames);
            console.log(category)


            // set Category and productName in orderDetail
            let newOrderDetails = [...orderDetails];
            let newId = index;

            // clothNames.forEach((word, idx) => {
            for (let idx = 0; idx < clothNames.length; idx++) {
                let newCategory = category[idx];
                let word = clothNames[idx];
                let existingEmptyIndex = newOrderDetails.findIndex(detail => detail.category === '' && detail.productName === '' && detail.workType === '' && detail.productCount === '');

                if (existingEmptyIndex !== -1) {
                    // If there's an existing empty row, update it
                    newOrderDetails[existingEmptyIndex] = { ...newOrderDetails[existingEmptyIndex], category: newCategory, productName: word, workType: '', productCount: quantity[idx] };
                } else {
                    // Otherwise, insert a new row at the start
                    newOrderDetails = [{ rowid: newId + 1, category: newCategory, productName: word, workType: '', productCount: quantity[idx] }, ...newOrderDetails];
                    newId++; // Increment newId since we're adding a new row
                }
                // console.log("newOrderDetails")

            };

            // Check if the last goperation added a new row, if not, add an empty one for future input
            if (clothNames.length > 0) {
                newOrderDetails = [{ rowid: newId + 1, category: '', productName: '', workType: '', productCount: '' }, ...newOrderDetails];
                newId++;
            }
            // console.log(newOrderDetails)
            setOrderDetails(newOrderDetails);
            setIndex(newId);
        } catch (error) {
            console.error('Error with speech recognition:', error);
        }
    }

    useEffect(() => {
        console.log(orderDetails);
    }, [orderDetails]);

    //get bill
    function getBill(filteredOrderDetails) {
        let totalBill = 0;
    
        filteredOrderDetails.forEach(orderItem => {
            // Find the corresponding item in clothingPrices
            const clothingItem = clothingPrices.find(item => item.name === orderItem.productName);
    
            if (clothingItem) {
                let price = 0;
    
                // Calculate the price based on the workType
                switch (orderItem.workType) {
                    case 'iron':
                        price = clothingItem.iron;
                        break;
                    case 'steamiron':
                        price = clothingItem.steamiron;
                        break;
                    case 'laundry':
                        price = clothingItem.laundry;
                        break;
                    case 'dryiron':
                        price = clothingItem.dryiron;
                        break;
                    default:
                        break;
                }
    
                // Add the price multiplied by the productCount to the total bill
                totalBill += price * orderItem.productCount;
            }
        });
        console.log("totalBill")
        console.log(totalBill)
    
        return totalBill;
    }

    // submit order details
    async function submitForm(e) {
        console.log("hii")
        e.preventDefault();
        console.log("customer mobile", custMob)

        const filteredOrderDetails = orderDetails.filter(item =>
            item.productName !== '' && item.productCount !== ''
        );

        let bill = getBill(filteredOrderDetails)

        const clothDetail_mobile = {
            custMob: custMob,
            bill: bill,
            clothDetail: filteredOrderDetails.map(item => ({
                clothtName: item.productName,
                clothCount: item.productCount
            }))
        };

        console.log(clothDetail_mobile);

        try {
            const response = await fetch(`${apiUrl}/placeorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(clothDetail_mobile)
            });

            if (response.ok) {
                console.log("hii")
                const responseData = await response.json(); // Parse the JSON response body
                navigate(`/order_success`, { state: { message: "order successful" } })
            }
        } catch (err) {
            console.error("Error occurred while sending request:", err);
            navigate(`/error`, { state: { message: "Order Not Placed" } })

        }
    }

    return (
        <div>
            <div style={{ backgroundColor: "#1d2b53", minHeight: "100vh" }}>
                <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-12 col-md-6 mt-4 mb-4">
                            <div className="card p-4 shadow-lg border-danger" style={cardStyle}>

                                <div className='mb-2' style={{ display: 'flex', alignItems: 'center' }}>
                                    <h3 style={{ margin: '0' }}>Press Mic</h3>
                                    <button className="mb-2 bg-white" style={{ border: 'none', marginLeft: '20px' }} onClick={voiceOrder}>
                                        <FaMicrophone style={{ color: "red", fontSize: "30px" }} />
                                    </button>
                                </div>

                                <form onSubmit={submitForm}>
                                    {orderDetails.map((order, orderIndex) => (
                                        <div key={order.rowid} className="row mb-3 mt-2">
                                            {/* Category like men, women, shoes, home cloth */}
                                            <div className="col-5">
                                                <select
                                                    name={`category_${order.rowid}`}
                                                    id={`category_${order.rowid}`}
                                                    className='category form-select'
                                                    value={order.category}
                                                    onChange={(e) => handleInputChange(order.rowid, 'category', e.target.value)}
                                                >
                                                    <option value="">Category</option>
                                                    <option value="men">Men</option>
                                                    <option value="women">Women</option>
                                                    <option value="home">Home</option>
                                                </select>
                                            </div>

                                            {/* Product category */}
                                            <div className="col-7">
                                                <select
                                                    name={`clothName_${order.rowid}`}
                                                    id={`clothName_${order.rowid}`}
                                                    className='clothName form-select'
                                                    value={order.productName}
                                                    onChange={(e) => handleInputChange(order.rowid, 'productName', e.target.value)}

                                                >
                                                    {order.category === 'men' ? (
                                                        men.map((item, index) => (
                                                            // item contains {normalsherwani} but {display normal}sherwani in select tag for better UI
                                                            <option key={index} value={item}> {Object.keys(wordPairs).find(key => wordPairs[key] === item) || item} </option>
                                                        ))
                                                    ) : order.category === 'women' ? (
                                                        women.map((item, index) => (
                                                            <option key={index} value={item}> {Object.keys(wordPairs).find(key => wordPairs[key] === item) || item}</option>
                                                        ))
                                                    ) : order.category === 'home' ? (
                                                        home.map((item, index) => (
                                                            <option key={index} value={item}> {Object.keys(wordPairs).find(key => wordPairs[key] === item) || item}</option>
                                                        ))
                                                    ) : (
                                                        <option value="">Select Cloth</option>
                                                    )
                                                    }

                                                </select>
                                            </div>

                                            {/* Second Row: Count and Add/Delete Button */}

                                            <div className="row mt-1">


                                                <div className="col-6">
                                                    <select className="form-select" value={order.workType} onChange={(e) => handleInputChange(order.rowid, 'workType', e.target.value)}>
                                                        <option value="">Work Type</option>
                                                        <option value="iron">Iron</option>

                                                        <option value="dry">Dry Clean</option>
                                                        <option value="steam">SteamIron</option>
                                                        <option value="laundry">Laundry</option>
                                                    </select>
                                                </div>

                                                <div className="col-4">
                                                    <input type="number" className="form-control" value={order.productCount} onChange={(e) => handleInputChange(order.rowid, 'productCount', e.target.value)} placeholder="Count" />
                                                </div>

                                                <div className="col-2">
                                                    {orderIndex === 0 && (
                                                        <button className="btn btn-primary" onClick={handleAddRow}>Add</button>
                                                    )}
                                                    {orderIndex !== 0 && (
                                                        <button className="btn" onClick={() => handleDeleteRow(order.rowid)} style={{ background: 'none', border: 'none' }}>
                                                            <MdDelete style={{ fontSize: "35px", color: "red" }} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                    ))}

                                    {/* mobile number */}
                                    <div className='mt-2'>
                                        <label className='fw-bold'>Customer Mobile No. </label>
                                        <input className=" form-control mb-4" type='mobile' value={custMob} onChange={(e) => setCustMob(e.target.value)} placeholder='Mobile Number' />
                                    </div>
                                    <button type="submit" className="btn btn-success mt-2">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderByVoice



