'use strict';

const url = {
    google: 'https://www.google.com/',
    banners: [
        "url('./images/peppermint/bg.jpg')",
        "url('./images/rasberry/bg.jpg')",
        "url('./images/peach/bg.jpg')",
    ],
    taglines: [
        "url('./images/peppermint/tagline/tagline.png')",
        "url('./images/rasberry/tagline/tagline.png')",
        "url('./images/peach/tagline/tagline.png')",
    ],
    newBanners: [
        './images/peppermint/newBanner.png',
        './images/rasberry/newBanner.png',
        './images/peach/newBanner.png',
    ]
}

const classes = {
    avaible: 'avaible',
    notAviable: 'notAviable',
}

const banner = document.querySelector( '#banner' );
const notBanner = document.querySelector( '#notBanner' );
const bannerHead = banner.querySelector( '#bannerHead' );
const slider = banner.querySelector( '#slider' );
const slides = slider.querySelector( '#slides' );
const slidesInner = slides.querySelector( '#slidesInner' );
const prev = banner.querySelector( '#arrowPrev' );
const next = banner.querySelector( '#arrowNext' );
const slidesImg = document.querySelectorAll( '.slide-item' );
const link = document.querySelector( '#link' );

const elementsPeppermint = document.querySelectorAll( '.element-peppermint' );
const elementsRasberry = document.querySelectorAll( '.element-rasberry' );
const elementsPeach = document.querySelectorAll( '.element-peach' );
const elements = [ elementsPeppermint, elementsRasberry, elementsPeach ];

const width = slides.clientWidth;
let offset = 0;
let indexSlide = 0;
let orientScreen;
let xStart, yStart;
let xMove, yMove;



window.addEventListener( 'orientationchange', onChangeOrient )
link.addEventListener( 'click', onLinkClick );

prev.addEventListener( 'click', onPrevClick );
next.addEventListener( 'click', onNextClick );

slider.addEventListener( 'touchstart', onTouchStart );
slider.addEventListener( 'touchmove', onTouchMove );


init( 1500 );



function onChangeOrient() {
    orientScreen = window.orientation;
    checkOrientation( orientScreen );
}

function onLinkClick() {
    window.location.href = url.google;
}

function onPrevClick( e ) {

    changeBackgroundsAllPrev();
    translatePrevSlide();
}

function onNextClick( e ) {
    changeBackgroundsAllNext();
    translateNextSlide();
}

function onTouchStart( e ) {
    xStart = e.touches[ 0 ].clientX;
    yStart = e.touches[ 0 ].clientY;
}

function onTouchMove( e ) {
    e.stopPropagation();

    xMove = e.touches[ 0 ].clientX;
    yMove = e.touches[ 0 ].clientY;
    const xDif = xStart - xMove;
    const yDif = yStart - yMove;

    if ( ( Math.abs( xDif ) > 15 ) && ( Math.abs( yDif ) < 20 ) ) {
        if ( xDif > 0 ) {
            changeBackgroundsAllNext();
            translateNextSlide();
        }
        if ( xDif < 0 ) {
            changeBackgroundsAllPrev();
            translatePrevSlide();
        }
    }
}


function init( ms ) {
    orientScreen = window.orientation;
    checkOrientation( orientScreen );

    setWidthSlides();

    setTimeout( () => {
        changeBackgroundImage( url.taglines[ 0 ], bannerHead );
    }, ms );
}


function checkOrientation( orient ) {
    switch ( true ) {
        case ( orient === 0 ):
            addClass( banner, classes.avaible );
            deleteClass( banner, classes.notAviable );

            addClass( notBanner, classes.notAviable );
            deleteClass( notBanner, classes.avaible );
            break;
        case ( orient === 90 ):
            addClass( banner, classes.notAviable );
            deleteClass( banner, classes.avaible );

            addClass( notBanner, classes.avaible );
            deleteClass( notBanner, classes.notAviable );
            break;
    }
}


function deleteClass( el, nameClass ) {
    el.classList.remove( nameClass );
}

function addClass( el, nameClass ) {
    el.classList.add( nameClass );
}

function setWidthSlides() {
    slidesInner.style.width = `${ 100 * slidesImg.length }%`;
}

function changeBackgroundsAllPrev() {
    elements[ indexSlide ].forEach( ( element ) => changeOpacity( 0, element ) );

    if ( indexSlide === 0 ) {
        indexSlide = ( slidesImg.length - 1 );
    } else {
        indexSlide--;
    }

    changeBackgroundImage( url.banners[ indexSlide ], banner );
    changeBackgroundImage( url.taglines[ indexSlide ], bannerHead );

    setTimeout( () => {
        elements[ indexSlide ].forEach( ( element ) => changeOpacity( 1, element ) );
    }, 500 )
}

function changeBackgroundsAllNext() {
    elements[ indexSlide ].forEach( ( element ) => changeOpacity( 0, element ) );

    if ( indexSlide === ( slidesImg.length - 1 ) ) {
        indexSlide = 0;
    } else {
        indexSlide++;
    }
    changeBackgroundImage( url.banners[ indexSlide ], banner );
    changeBackgroundImage( url.taglines[ indexSlide ], bannerHead );
    changeSrcImg( url.newBanners[ indexSlide ], newBanner );

    setTimeout( () => {
        elements[ indexSlide ].forEach( ( element ) => changeOpacity( 1, element ) );
    }, 500 )
}

function changeBackgroundImage( url, elem ) {
    elem.style.backgroundImage = url;
}

function changeSrcImg( url, elem ) {
    elem.src = url;
}

function changeOpacity( val, elem ) {
    elem.style.opacity = val;
}

function translatePrevSlide() {
    if ( offset === 0 ) {
        offset = +width * ( slidesImg.length - 1 );
    } else {
        offset -= +width;
    }

    slidesInner.style.transform = `translateX(-${ offset }px)`;
}

function translateNextSlide() {
    if ( offset === +width * ( slidesImg.length - 1 ) ) {
        offset = 0;
    } else {
        offset += +width;
    }
    slidesInner.style.transform = `translateX(-${ offset }px)`;
}