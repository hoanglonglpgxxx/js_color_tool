//kiểm tra có phải giá trị hex không
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const noti = document.getElementsByClassName('noti');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const toggleBtn = document.getElementById('toggleBtn');
const lightenText = document.getElementById('lighten');
const darkenText = document.getElementById('darken');

//ktra hex
const isHex = (hex) => {
    if (!hex) return false;
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
};

//toggle btn 
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('toggled');
    if (toggleBtn.classList.contains('toggled')) {
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    } else {
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    }
    reset();
});

//đổi color  của inputcolor
hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    const strippedHex = hex.replace('#', '');
    // console.log(hex);
    // console.log(strippedHex);

    if (isHex(hex)) {
        inputColor.style.backgroundColor = `#${strippedHex}`;
        noti[0].innerText = 'Nhập giá trị hex thành công';
    } else {
        // console.log('false');
        noti[0].innerText = 'Nhập đúng giá trị hex';
    }
    reset();
});

//convert hex thành rgb
//2 kí tự đầu là red
//tương tự với green , blue
//nếu có 1 kí tự thì cũng thế
const convertHexToRGB = (hex) => {
    if (!isHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
            + strippedHex[1] + strippedHex[1]
            + strippedHex[2] + strippedHex[2];
    }
    // console.log(strippedHex);
    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);
    return {
        r: r,
        g: g,
        b: b,
    };

};

//convert rgb thành hex
//luôn add 1 số 0 vào đầu r,g,b để tránh 
//trường hợp chỉ return 1 digit 
//sau đó chỉ slice lấy 2 số cuối
const convertRGBToHex = (r, g, b) => {

    const firstPair = ('0' + r.toString(16)).slice(-2);
    const secondPair = ('0' + g.toString(16)).slice(-2);
    const thirdPair = ('0' + b.toString(16)).slice(-2);

    const hex = '#' + firstPair + secondPair + thirdPair;
    return hex;
};

//chỉnh màu
//tính r,g,b :  lấy % từ slider / 100 sau đó * 255
const alterColor = (hex, percent) => {
    const { r, g, b } = convertHexToRGB(hex);
    const amount = Math.floor((percent / 100) * 255);
    const newR = withinRange(r, amount);
    const newG = withinRange(g, amount);
    const newB = withinRange(b, amount);
    //tính xong thì đổi lại thành hex
    return convertRGBToHex(newR, newG, newB);
};

//chỉnh từ percent bị quá 255, phải thêm func này
//để giá trị không bị quá 255
const withinRange = (hex, amount) => {
    // const newHex = hex + amount;
    // if (newHex > 255)
    //     return 255;
    // if (newHex < 0) return 0;
    // return newHex;
    return Math.min(255, Math.max(0, hex + amount));
};

//slider
slider.addEventListener('input', () => {
    if (!isHex(hexInput.value)) return;
    sliderText.innerText = `${slider.value}%`;

    //chỉnh darken, lighten từ toggle btn
    const valueNegativePositive = toggleBtn.classList.contains('toggled') ? - slider.value : slider.value;


    const alteredHex = alterColor(hexInput.value, valueNegativePositive);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color: ${alteredHex}`;
});

//reset
const reset = () => {
    slider.value = 0;
    sliderText.innerText = `0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color: ${hexInput.value}`;


};

// console.log(convertHexToRGB('ffe'));
// console.log(convertRGBToHex(0, 230, 0));
// console.log(isHex('#00000'));
// console.log(isHex('#000000'));
// console.log(isHex('#000'));
// console.log(isHex('123'));