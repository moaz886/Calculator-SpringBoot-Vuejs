
new Vue({
    el: "#app",
    data() {
        return {
            logList: "",
            current: "",
            answer: "",
            operatorClicked: true
        };
    },
    methods: {
        append(number) {
            if (this.operatorClicked) {
                this.current = "";
                this.operatorClicked = false;
            }
            this.current = `${this.current}${number}`;
        },
        addtoLog(operator) {
            if (this.operatorClicked == false) {
                this.logList += `${this.current} ${operator} `;
                this.current = "";
                this.operatorClicked = true;
            }
        },
        clear() {
            this.current = "";
            this.answer = "";
            this.logList = "";
            this.operatorClicked = false;
        },
        sign() {
            if (this.current != "") {
                this.current =
                    this.current.charAt(0) === "-"
                        ? this.current.slice(1)
                        : `-${this.current}`;
            }
        },
        percent() {
            if (this.current != "") {
                this.current = `${parseFloat(this.current) / 100}`;
            }
        },
        dot() {
            if (this.current.indexOf(".") === -1) {
                this.append(".");
            }
        },
        divide() {
            this.addtoLog("÷");
        },
        times() {
            this.addtoLog("*");
        },
        minus() {
            this.addtoLog("-");
        },
        plus() {
            this.addtoLog("+");
        },
        async equal() {

            if (this.operatorClicked == false) {
                axios.get("http://localhost:8080/calc",{
                    params :{
                        name : (this.logList+this.current)
                    }
                })
                    .then(response => {
                        this.answer=response.data.toString();
                    })

            } else {
                this.answer = "invalid";
            }



        }
    }
});