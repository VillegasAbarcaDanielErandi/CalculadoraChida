import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { create, all } from 'mathjs';

const math = create(all, {});

const App = () => {
  const [input, setInput] = useState('');

  const handleButtonPress = (value) => {
    const currentInput = input;
    

    if (String(currentInput) === "Error") {
      setInput(value);
    } 
    else{
      setInput(input + value);
    }
   
    
  };

  const clearLastInput = () => {
    setInput(input.slice(0, -1)); 
  };

  const calculateResult = () => {
    
    try {
      const expression = input
        .replace(/x/g, '*')
        .replace(/√(\d+|\([^)]+\))/g, (_, number) => `sqrt(${number})`)
        .replace(/log\(/g, 'log10(') // Cambiar √ a Math.sqrt(
        .replace(/ln\(/g, 'log(')
        
        
        .replace(/(\d+)%/g, '($1 / 100)'); // Cambiar porcentaje a decimal
  
      if (expression.includes('sin') || expression.includes('cos') || expression.includes('tan')) {
        const angleRegex = /(?:sin|cos|tan)\(([^)]+)\)/g;
        let modifiedExpression = expression;
        let match;
  
        while ((match = angleRegex.exec(expression)) !== null) {
          const angleInDegrees = parseFloat(match[1]);
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const func = match[0].slice(0, 3);
  
          let result;
          if (func === 'sin') {
            result = Math.sin(angleInRadians);
          } else if (func === 'cos') {
            result = Math.cos(angleInRadians);
          } else if (func === 'tan') {
            result = Math.tan(angleInRadians);
          }
  
          if (Math.abs(result) < 1e-10) {
            result = 0;
          }
  
          modifiedExpression = modifiedExpression.replace(match[0], result);
        }
  
        const evalResult = math.evaluate(modifiedExpression);
        setInput(evalResult.toString());
      } else {
        const evalResult = math.evaluate(expression);
        setInput(evalResult.toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };
  
  
  
  
  
  
  

  const clearInput = () => {
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.calculatorContainer}>
        <TextInput
          style={styles.input}
          value={input}
          editable={false}
        />

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('√')}>
            <Text style={styles.buttonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('^')}>
            <Text style={styles.buttonText}>^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('ln(')}>
            <Text style={styles.buttonText}>ln</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('log(')}>
            <Text style={styles.buttonText}>log</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('sin(')}>
            <Text style={styles.buttonText}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('cos(')}>
            <Text style={styles.buttonText}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('tan(')}>
            <Text style={styles.buttonText}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('%')}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonAC} onPress={clearInput}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOP} onPress={() => handleButtonPress('(')}>
            <Text style={styles.buttonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOP} onPress={() => handleButtonPress(')')}>
            <Text style={styles.buttonText}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOP} onPress={() => handleButtonPress('/')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOP} onPress={() => handleButtonPress('x')}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOP} onPress={() => handleButtonPress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOP} onPress={() => handleButtonPress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearLastInput}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonI} onPress={calculateResult}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  calculatorContainer: {
    width: 240,
    padding: 20,
    backgroundColor: '#1f1e1e',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
    textAlign: 'right',
    fontSize: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 200,
    marginVertical: 5,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#4d4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonAC: {
    width: 40,
    height: 40,
    backgroundColor: '#3e6d3f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonOP: {
    width: 40,
    height: 40,
    backgroundColor: '#0b3299',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonI: {
    width: 40,
    height: 40,
    backgroundColor: '#00217a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default App;
