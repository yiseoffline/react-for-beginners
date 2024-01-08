<!DOCTYPE html>
<html>
<body>
    <div id="root"></div>
</body>
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
    function MinutesToHours(){
        const [amount, setAmount] = React.useState();
        const [inverted, setinverted] = React.useState(false); // 초기값 = false
        const onChange = (event) =>{
            setAmount(event.target.value);
        }
        const reset = () => setAmount(0);
        const onInvert = () => {
            reset();
            setinverted(current => !current);
        } // true->false, false->true
    return(
        <div>
            <div>
                <label htmlFor = "minutes">Minutes</label>
                <input 
                    value = {inverted ? amount*60 : amount} 
                    id = "minutes"
                    placeholder = "Minutes" 
                    type = "number"
                    onChange = {onChange} // event(onChange)가 일어나면 onChange 함수 실행
                    disabled = {inverted}
                />
            </div>
            
            <div>
                <label htmlFor = "hours">Hours</label>
                <input 
                    value = {inverted ? amount : amount/60}
                    id = "hours" 
                    placeholder = "Hours" 
                    type = "number"
                    onChange = {onChange}
                    disabled = {!inverted} // if flipped가 false, hours는 disable
                />
            </div>
            <button onClick = {reset}>Reset</button>
            <button onClick = {onInvert}>{inverted ? "Turn back ": "Invert"}</button>
        </div>
        );
    }
    function KmToMiles(){
        return <h3>KM 2 M</h3>;
    }
    function App(){
        const[index, setIndex]=React.useState("0");
        const onSelect  = (event)=>{
            setIndex(event.target.value);
        };
        return(
            <div>
                <h1>Super Converter</h1>
                <select value = {index} onChange={onSelect}>
                    <option value="xx">Select your units</option>
                    <option value="0">Minutes & Hours</option>    
                    <option value="1">Km & Miles</option>  
                </select>
                {index === "xx" ? "please select your units" : null}
                {index === "0" ? <MinutesToHours/> : null}
                {index === "1" ? <KmToMiles/> : null}
            </div>
        );
    }
    const root = document.getElementById("root");
    ReactDOM.render(<App/>, root); 
</script>
</html>
