const elTime = document.querySelector('.time');
const elSexDiv = document.querySelector('.sex');
const elName = document.querySelector('p[class=nameUser]');
const elNameInput = document.querySelector('input[name=input_name]');
const elBtnOk = document.querySelector('button[name=nameOk]');
const elSelectSex = document.querySelector('select[name=sex_select]');
const elNameDiv = document.querySelector('.name');
const elAge = document.querySelector('.age_block');
const elAnswer = document.querySelector('.answer');
const elInputYear = document.querySelector('input[name=year]');
const elComment = document.querySelector('.comment');
const elBtnClose = document.querySelector('button[name=btn_close');
const elInputDate = document.querySelector('input[name=bth_date]');

let year, age;

const time = Number(moment().format('YYYY')); 
elTime.innerHTML = `Зараз: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`;

elName.innerHTML = 'Вітаю! Як до Вас звертатися?'; 
elNameDiv.classList.add('show');

//зробити першу літеру заглавною
const upFirst = (str) => {
    str = str.toLowerCase();  // зробити всі літери маленькими
    str = `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    return str;   
};

elBtnOk.addEventListener('click', () => {
    let nameUs = elNameInput.value;
        if (nameUs != '') nameUs = upFirst(nameUs)
        else return;
    elName.innerHTML = `Вітаю, ${nameUs}!`; 
    elNameDiv.classList.remove('show');
    elSexDiv.classList.add('show');
});

elNameInput.addEventListener('keyup', () => {
    elNameInput.value = elNameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ ]/g, '');
})

elSelectSex.addEventListener('change', (ev) => {
    let sex = ev.target.value;
    elAnswer.innerHTML = '';
    if (sex === 'female') {
        elAnswer.innerHTML = `<p>Яка ж ти гарненька киця! <br> У жінок про вік не питають!</p><img src="./images/catgirl.gif">`;
        elAge.classList.remove('show');
    } else if (sex === 'male') { 
        elInputYear.value = '';
        elInputDate.value = '';
        elAnswer.innerHTML = 'Якого ти року народження?';
        elAge.classList.add('show');
        elComment.innerHTML = '';
    } else {
        elAnswer.innerHTML = 'Здається, нічого не обрано...'
        elAge.classList.remove('show');
    };
});

elInputYear.addEventListener('keyup', (ev) => {
    elInputDate.value = '';
    elInputYear.value = elInputYear.value.replace(/[^0-9.]/g, '');
    year = Number(ev.target.value);
    year_check(year);
});

elBtnClose.addEventListener('click', () => {
    elInputYear.value = '';
    elComment.innerHTML = '';
});

elInputDate.addEventListener('change', (ev) => {
    elInputYear.value = '';
    let BthDate = ev.target.value;
    let year = Number(BthDate.substring(0,4)); 
    //let date = moment(BthDate).fromNow();
    //console.log ('data', date);
    year_check(year);
});

const year_check = (year) => {
    if (year < '1900') {
        elComment.innerHTML = 'Твій вік занадто стародавній. Ти часом не динозавр? Вкажи реальний рік!';
        return;
    }
    if (year > '2023') {
        elComment.innerHTML = 'Агов! Ти ще не народився?? Вкажи правильний рік!';
        return;
    }
       
    age = Number(time - year);
    elComment.innerHTML = `Тобі ${age} років.`;
    if (age < 18) {elComment.insertAdjacentHTML("beforeend", `<p>Тому ще зарано таке дивитися!</p>`)}
    else {elComment.insertAdjacentHTML("beforeend", `<p>Сідай зручніше, обирай цікавіше!</p>`)};
    return;
}


