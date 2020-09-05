class Calculator {
    constructor( previousOperandTextElement,currentOperandTextElement){
        this.currentOperandTextElement  =currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }
    
    clear(){
        this.previousOperand = ' ';
        this.currentOperand = ' ';
        this.operation = undefined;
        
        
    }
    delete_(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        
    }
    
    append_number(number){
        if(number === '.' && this.currentOperand.includes('.') || this.currentOperand === ''){
            return
        }
        else{
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }
    choose_operation(operation){
        
        if(this.currentOperand === ' ')return
        if(this.previousOperand !== ' '){
            console.log('prev - ',this.previousOperand)
            console.log('cur - ',this.currentOperand)
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand
        this.currentOperand = ' ';    
    }
    
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if(isNaN(prev) || isNaN(current)) return
        console.log(prev, current)
        
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break;
                
            case '/':
                computation = prev / current
                break;
            default:
                return;
        
        }
       
        this.currentOperand = computation;
        this.previousOperand = ' ';
        this.operation = undefined;   
        
    }
    
    format_number(number){
        let num  = number.toString();
        const integer_side = parseFloat(num.split(',')[0])
        const float_side = num.split(',')[1]
        let intergerDisplay
        
        if(isNaN(integer_side)){
            return ''
        }
        else{
            intergerDisplay = integer_side.toLocaleString('en', {maximunFractioDigits:0})
        }
        if (!isNaN(float_side) ){
            intergerDisplay = `${integer_side}${float_side}`    
        }
        else{
            intergerDisplay = integer_side
        }
        
        return intergerDisplay
    }
    update_display(){
        this.currentOperandTextElement.innerText = this.format_number(this.currentOperand);
        
        if(this.operation === undefined){
            this.previousOperandTextElement.innerText = this.format_number(this.previousOperand);
            
        }
        else{
            this.previousOperandTextElement.innerText = `${this.format_number(this.previousOperand)} ${this.operation}`;
        }
        
        
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons  = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement  = document.querySelector('[data-prev-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create an instance of the calculator
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

// select the number buttons

numberButtons.forEach(item=>{
    item.addEventListener('click',()=>{
        calculator.append_number(item.innerText);
        calculator.update_display();
        //console.log(item.innerText);
    });
});

// Select Operation

operationButtons.forEach(item=>{
    item.addEventListener('click', ()=>{
        calculator.choose_operation(item.innerText);
        calculator.update_display();
    });
});

// Equals / Compute

equalsButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.update_display();
});

// Clear

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.update_display();
});

// Delete

deleteButton.addEventListener('click', ()=>{
    calculator.delete_();
    calculator.update_display();
});






//calculator.format_number("237373734848441234");