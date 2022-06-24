(function () {
    const inputs = document.querySelectorAll('.time-input input')
    const buttonAdd = document.getElementById('btn-add');
    const buttonSubtract = document.getElementById('btn-subtract');
    const result = document.getElementById('result');

    inputs.forEach(input => {
        input.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                result.value = getTime(true, false) // add = true, subtract = false
                buttonAdd.focus();
            }
        })
    })

    buttonAdd.addEventListener('click', () => {
        result.value = getTime(true, false); // add = true, subtract = false
    });

    buttonSubtract.addEventListener('click', () => {
        result.value = getTime(false, true); // add = false, subtract = true
    });

    function getTime(add, subtract) {
        let days = 0;
        let time1 = document.getElementById('time-1').value.split(':');
        let time2 = document.getElementById('time-2').value.split(':');

        if (time1[0] === '' || time1[1] === '' || time2[0] === '' || time2[1] === '') {
            return 'Insira um horário válido';
        }

        let time1InSeconds = convertTime(time1);
        let time2InSeconds = convertTime(time2);
        let resultInSeconds = 0;

        if (add) {
            resultInSeconds = time1InSeconds + time2InSeconds;
        } else if (subtract) {
            resultInSeconds = time1InSeconds - time2InSeconds;
        } else {
            resultInSeconds = 0;
        }

        if (resultInSeconds > 86400) {
            days = Math.floor(resultInSeconds / 86400);
            resultInSeconds -= days * 86400;
        }

        let hours = Math.floor(resultInSeconds / 3600);
        resultInSeconds -= hours * 3600;

        let minutes = Math.floor(resultInSeconds / 60);
        resultInSeconds -= minutes * 60;

        days = days.toString();
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        if (days > 1) {
            return `Daqui a ${days} dias às ${hours} : ${minutes}`;
        } else if (days === 1) {
            return `Daqui a ${days} dia às ${hours} : ${minutes}`;
        } else {
            return `${hours} : ${minutes}`;
        }
    }

    function convertTime(time) {
        let hours = parseInt(time[0]);
        let minutes = parseInt(time[1]);
        return hours * 3600 + minutes * 60;
    }
})()