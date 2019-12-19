import React from 'react'
import Paper from '@material-ui/core/Paper';
import { flexbox, textAlign } from '@material-ui/system';
import { grey } from '@material-ui/core/colors';
import { wrap } from 'module';


function Slide(props) {
    return (
        <div
            style={{
                backgroundImage: `url('${props.backgroundUrl}')`,
                ...styles.container,
            }}
        >
           
            <h1 style={styles.cityName}>{props.city}</h1>
            
            <Paper style={styles.item}>
                <h1 style={styles.measureTitle}>Temperature</h1>
                <h2 style={styles.measures}>{props.temperature}°</h2>
            </Paper>
            <Paper style={styles.item}>
                <h1 style={styles.measureTitle}>Humidity</h1>
                <h2 style={styles.measures}>{props.humidity}%</h2>
            </Paper>
            <Paper style={styles.item}>
                <h1 style={styles.measureTitle}>Pressure </h1>
                <h2 style={styles.measures}>{props.pressure}mBar</h2>
            </Paper>
        </div>
    )
}

const styles = {
    container: {
        height: '100%',
        backgroundSize: 'cover',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    item: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: 50,
        opacity: '0.6',
        fontSize: 14,
       
    },
    cityName: { 
        display: 'flex',
        fontSize: 100,
        justifyContent: 'center',
        color: '#dce2e1',
        opacity: 0.9,
        width: '100%',
        textAlign: 'left',
        textShadow: '3px 3px grey',
       
    },
    measureTitle: {
        fontSize: 30 ,
        textAlign: 'center',
    
    },
    measures: {
        fontSize: 30,
        textAlign: 'center',
    }


}

export default Slide