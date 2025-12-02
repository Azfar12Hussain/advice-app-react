import React, { useEffect , useState} from 'react';
import { Button, Card, Form, Input, Select,} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Option } from 'antd/es/mentions';
import Item from 'antd/es/list/Item';
import { RiCoinLine } from 'react-icons/ri';

function Converter1() {
    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';

    const defaultFirstSelectValue = "Bitcoin" 
    const defaultSecondSelectValue = "Ether" 
   
    const [cryptoList, setCryptoList] = useState([]);
    const [inputValue, setInputValue] = useState("0");
    const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue);
    const [result, setResult] = useState("0");

    

    useEffect(() => {
   
        fetchData();

    }, []);
    
    useEffect(() => {
        
        if(cryptoList.length == 0 ) return;
        const firstSelectRate = cryptoList.find((item) => {
            return item.value === firstSelect
        }).rate

        const secondSelectRate = cryptoList.find((item) => {
            return item.value === secondSelect
        }).rate
        
        const resultValue = (inputValue * secondSelectRate) / firstSelectRate
        setResult(resultValue.toFixed(3))

    }, [inputValue,firstSelect,secondSelect,cryptoList]);
    
    async function fetchData(params) {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        
        const data = jsonData.rates
       
        const tempArray = Object.entries(data).map(item => {
                return {
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value
            }
        })

        setCryptoList(tempArray);
    }

  return (
    <div className='container'>
        <Card className="crypto-card" title={<h1><RiCoinLine/>crypto-converter</h1>}>
            <Form>
                <FormItem>
                    <Input  onChange={(e) => setInputValue(e.target.value)}/>
                </FormItem>
            </Form>
            <div className="select-box">
                <Select
                    options={cryptoList} 
                    defaultValue={defaultFirstSelectValue} 
                    style={{ width: 160 }}
                    onChange={(value) => setFirstSelect(value)}
                 > 
                 </Select>
                <Select 
                    options={cryptoList} 
                    defaultValue={defaultSecondSelectValue} 
                    style={{ width: 160 }} 
                    onChange={(value) => setSecondSelect(value)}
                > 

                </Select>
            </div>
            <p>{inputValue}{firstSelect} = {result}{secondSelect}</p>
        </Card>
    </div>
    
  )
}


export default Converter1