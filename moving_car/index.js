//state
const carsTypeImg = {
    car: './images/1_car.png',
    motorcycle:'./images/2_car.png',
    bicycle:'./images/3_car.png',
    truck:'./images/4_car.png',
    tractor:'./images/5_car.png'
}

const keyCode = {
    left:37,
    up:38,
    right:39,
    down:40
}

//dom
let velocitySelectDom = document.querySelector('#velocity')
let carsTypeSelectDom = document.querySelector('#carsType')
let carImgDom = document.querySelector('#carImg')
let restartBtnDom = document.querySelector('#restartBtn')
let boxDom = document.querySelector('.box')

//读取内存数据，初始化
velocitySelectDom.value = localStorage.getItem('currVel') || '1'
carsTypeSelectDom.value = localStorage.getItem('currCarType') || 'car'
renderCar(carsTypeSelectDom.value)
carImgDom.style.transform = localStorage.getItem('currDirection') || 'rotate(0deg)'
carImgDom.style.left = localStorage.getItem('currLeft') || '0px'
carImgDom.style.top = localStorage.getItem('currTop') || '0px'

//event
//改变车型
carsTypeSelectDom.addEventListener('change', (e) => {
    let carType = e.target.value
    renderCar(carType)
    myStorage()
})

//改变速度
velocitySelectDom.addEventListener('change', (e) => {
    myStorage()
})

//键盘控制小车
window.addEventListener('keydown', (e) => {
    changeDirection(e.key)
    moveCar(e.key)
    myStorage()
})

//重新开始
restartBtnDom.addEventListener('click', () => {
    carImgDom.style.left = '0px'
    carImgDom.style.top = '0px'
    carImgDom.style.transform = 'rotate(0deg)'
    myStorage()
    velocitySelectDom.value = '1'
    carsTypeSelectDom.value = 'car'
    localStorage.clear()
})
//function
//渲染小车
function renderCar(parm){
    carImgDom.src = carsTypeImg[parm]
}

//保存车辆数据
function myStorage(){
    const currVel = velocitySelectDom.value
    const currCarType = carsTypeSelectDom.value
    const currDirection = carImgDom.style.transform
    const currLeft = carImgDom.style.left
    const currTop = carImgDom.style.top
    localStorage.setItem('currVel', currVel)
    localStorage.setItem('currCarType', currCarType)
    localStorage.setItem('currDirection', currDirection)
    localStorage.setItem('currLeft', currLeft)
    localStorage.setItem('currTop', currTop)
}

//小车转向
function changeDirection(key){
    if(key == 'ArrowLeft'){
        carImgDom.style.transform = 'scale(-1,1)'
    }else if(key == 'ArrowUp'){
        carImgDom.style.transform = 'rotate(-90deg)'
    }else if(key == 'ArrowRight'){
        carImgDom.style.transform = 'rotate(0deg)'
    }else if(key == 'ArrowDown'){
        carImgDom.style.transform = 'rotate(90deg)'
    }
}
//小车移动
function moveCar(key){
    const speed = parseInt(velocitySelectDom.value)
    let currleft = parseInt(window.getComputedStyle(carImgDom).left.replace(/px/g,''))
    let currtop = parseInt(window.getComputedStyle(carImgDom).top.replace(/px/g,''))
    const leftLimit = boxDom.scrollWidth - carImgDom.width
    const topLimit = boxDom.clientHeight - carImgDom.width*0.5
    console.log(leftLimit,topLimit)
    if(key == 'ArrowLeft'){
        currleft -= speed
        if (currleft < 0) {
            alert('哎呀～到边界了～')
            currleft = 0
        } else {
            carImgDom.style.left = `${currleft}px`
        }
    }else if(key == 'ArrowUp'){
        currtop -= speed
        if(currtop < 0) {
            alert('哎呀～到边界了～')
            currtop = 0
        } else {
         carImgDom.style.top = `${currtop}px`
        }
    }else if(key == 'ArrowRight'){
        currleft += speed
        if(currleft > leftLimit) {
            alert('哎呀～到边界了～')
            currleft = leftLimit
        } else {
            carImgDom.style.left = `${currleft}px`
        }
    }else if(key == 'ArrowDown'){
        currtop += speed
        if(currtop > topLimit) {
            alert('哎呀～到边界了～')
            currtop = topLimit
        }else {
            carImgDom.style.top = `${currtop}px`
        }
    }        
}
