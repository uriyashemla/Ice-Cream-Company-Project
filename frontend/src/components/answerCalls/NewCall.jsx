import { useState } from "react";
import { Button, TableRow, TableCell, TextField, Typography, MenuItem } from "@mui/material";
import { useStopwatch } from "react-timer-hook";
import axios from "axios";

import { formatTime } from "../../utils/formatTime";
import Iconify from "../general/Iconify";
import config from "../../config";


const PRODUCTS = ["חלבה","לימון", "תות", "שוקולד", "וניל"];
const GENDERS = ["זכר", "נקבה"];



const SEND_NEW_PURCHASE = `${config.messageBrokerURL}/api/calls`;

export default function NewCall({ id, data, setActiveCalls }) {
    const [callData, setCallData] = useState('');
    const [name,setName]= useState('');
    const [city,setCity]= useState('');
    const [age,setAge]= useState('');
    const [flavor,setFlavor]= useState('');
    const [gender,setGender]= useState('');
    const [amount,setAmount]= useState('');

    

    // const handleEndCall = async (e) => {
    //     e.preventDefault();
    //     const timeNow = Date.now();
    //     const call = {
    //         ...callData,
    //         id: Number(callData.id),
    //         duration: timeNow - callData.start_time,
    //         end_time: timeNow,
    //         age: Number(callData.age)
    //     };
    //     try {
    //         await axios.post(SEND_NEW_CALL_URL, call);
    //         handleCancelCall();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleFinish=async(e) => {
        e.preventDefault();
        const timeNow=Date.now();
        const purchase={
            name,
            city,
            age,
            gender,
            flavor,
            amount,
            timeNow

        };
        try {
            await axios.post(SEND_NEW_PURCHASE, purchase);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelCall = () => {
        setActiveCalls((prev) => prev.filter((call) => call.id !== id));
    };
    const handleNewBuy = () => {
        setActiveCalls((prev) => prev.filter((call) => call.id !== id));
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCallData({
            ...callData,
            [name]: value
        });
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        const purchase={name,city,age,gender,flavor,amount};
        console.log(purchase);
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <TableRow hover key={id} tabIndex={-1} role="contentinfo" dir="rtl">
                {/* כפתור סיום שיחה */}
                {/* <TableCell align="center" style={{ width: "10px" }}>
                    <Button
                        size="small"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        endIcon={
                            <Iconify
                                icon="fluent:call-checkmark-20-filled"
                                style={{ marginRight: "10px" }}
                            />
                        }
                    >
                        סיום
                    </Button>
                    <Button
                        size="small"
                        onClick={handleCancelCall}
                        color="error"
                        endIcon={<Iconify icon="iconoir:cancel" style={{ marginRight: "10px" }} />}
                    >
                        ביטול
                    </Button>
                </TableCell> */}

                {/* זמן תחילת שיחה */}
                {/* <TableCell align="center">
                    <Typography>{formatTime(callData.start_time)}</Typography>
                    <Typography variant="caption">
                        <span>{hours.toLocaleString("en-US", { minimumIntegerDigits: 2 })}</span>:
                        <span>{minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 })}</span>:
                        <span>{seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })}</span>
                    </Typography>
                </TableCell> */}

                {/* טלפון */}
                {/* <TableCell align="right" sx={{ width: "130px" }}>
                    <Typography variant="button">{callData.phone}</Typography>
                </TableCell> */}

                {/* שם */}
                <TableCell align="right">
                    <TextField
                        required
                        autoFocus
                        label="שם מלא"
                        type="text"
                        size="small"
                        name="name"
                       
                        onChange= {(e)=> setName(e.target.value) }
                    />
                </TableCell>

                {/* עיר */}
                <TableCell align="right">
                    <TextField
                        required
                        label="עיר"
                        type="text"
                        size="small"
                        name="city"
                        onChange= {(e)=> setCity(e.target.value)}
                       
                    />
                </TableCell>

                {/* גיל */}
                <TableCell align="right" sx={{ width: "100px" }}>
                    <TextField
                        required
                        label="גיל"
                        type="number"
                        size="small"
                        name="age"
                        onChange= {(e)=> setAge(e.target.value)}
                    />
                </TableCell>

                {/* מין */}
                <TableCell align="right">
                    <TextField
                        value={callData.gender}
                        label="מין"
                        size="small"
                        name="gender"
                        select
                        onChange= {(e)=> setGender(e.target.value)}
                    >
                        {GENDERS.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                </TableCell>

                {/* מוצרים */}
                <TableCell align="right">
                    <TextField
                        value={callData.product}
                        label="טעמים"
                        size="small"
                        name="product"
                        select
                        
                        onChange= {(e)=> setFlavor(e.target.value)}
                        
                    >
                        {PRODUCTS.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                       

                    </TextField>
                </TableCell>

                {/* כמות */}
                      
                      <TableCell align="right">
                    <TextField
                        required
                        label="כמות"
                        type="number"
                        size="small"
                        name="topic"
                        onChange= {(e)=> setAmount(e.target.value)}
                        
                    />
                </TableCell>

                <TableCell align="center" style={{ width: "10px" }}>
                    <Button
                        size="small"
                        type="submit"
                        variant="outlined"
                        onClick={handleFinish}
                        color="primary"
                        
                        endIcon={
                            <Iconify
                                icon="lucide:ice-cream"
                                style={{ marginRight: "10px" }}
                            />
                        }
                    >
                       קנה
                    </Button>
                    
                    
                    
                    
                   
                </TableCell>
                

                {/* נושא שיחה */}
                {/* <TableCell align="right">
                    <TextField
                        value={callData.topic}
                        id="outlined-select-currency"
                        size="small"
                        label="נושא שיחה"
                        name="topic"
                        select
                        onChange={handleChange}
                    >
                        {TOPICS.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                </TableCell> */}
            </TableRow>
        </form>
    );
}
