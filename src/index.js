import React, { useRef, useEffect } from 'react'

export const WindowScroll = ({children, height, width, scrollDirection, timeScrollDisabled, 
  mainPage, minWidth, backgroundColor, currentPageState, setCurrentPageState}) => {

    const windowScrollDiv = useRef(null)
    const stateRef = useRef();
    stateRef.current = currentPageState;
    const firstRender = useRef(2);
    const positionPagesRef = useRef();

    var scrollState = true

    function snapScroll(e) {
      if (e==undefined){
        //NAVBAR SCROLL EVENT
        windowScrollDiv.current.scroll({top: positionPagesRef.current[parseInt(stateRef.current)], behavior: 'smooth'})
      } else if (e.deltaY!=null) {
        //EVENT WHEEL
        e.preventDefault()
        if (scrollState) {
  
          scrollState = false
          setTimeout(function(){scrollState = true;}, timeScrollDisabled);
    
          if(e.deltaY < 0 ) {
            // SCROLL UP
            firstRender.current += 1;
            setCurrentPageState(parseInt(stateRef.current)-1)
            if (parseInt(stateRef.current) < 0) {
              firstRender.current += 1;
              setCurrentPageState(parseInt(stateRef.current)+1)
              return
            }
            windowScrollDiv.current.scroll({top: positionPagesRef.current[parseInt(stateRef.current)], behavior: 'smooth'})
    
          } else if(e.deltaY > 0) {
            // SCROLL DOWN
            firstRender.current += 1;
            setCurrentPageState(parseInt(stateRef.current)+1)
            if (parseInt(stateRef.current) > children.length-1) {
              firstRender.current += 1;
              setCurrentPageState(parseInt(stateRef.current)-1)
              return
            }
            windowScrollDiv.current.scroll({top: positionPagesRef.current[parseInt(stateRef.current)], behavior: 'smooth'})
          }
        }
      } else if (e.code!=null) {
        //KEYBOARD EVENT
        e.preventDefault()

        if (scrollState) {
          if(e.code === "ArrowUp") {
            // SCROLL UP
            scrollState = false
            setTimeout(function(){scrollState = true;}, timeScrollDisabled);
    
            firstRender.current += 1;
            setCurrentPageState(parseInt(stateRef.current)-1)
            if (parseInt(stateRef.current) < 0) {
              firstRender.current += 1;
              setCurrentPageState(parseInt(stateRef.current)+1)
              return
            }
            windowScrollDiv.current.scroll({top: positionPagesRef.current[parseInt(stateRef.current)], behavior: 'smooth'})
    
          } else if(e.code === "ArrowDown") {
            // SCROLL DOWN
            scrollState = false
            setTimeout(function(){scrollState = true;}, timeScrollDisabled);
    
            firstRender.current += 1;
            setCurrentPageState(parseInt(stateRef.current)+1)
            if (parseInt(stateRef.current) > children.length-1) {
              firstRender.current += 1;
              setCurrentPageState(parseInt(stateRef.current)-1)
              return
            }
            windowScrollDiv.current.scroll({top: positionPagesRef.current[parseInt(stateRef.current)], behavior: 'smooth'})
          }
        }
      } 
  
    }

    useEffect(() => {  
      if(window.innerWidth >= minWidth) {
        var positionPages = []

        if (mainPage > children.length-1)
          console.error("ERROR : The main page don't exist !")
    
        for (let i = 0; i<children.length; i++) {
          if (children[i].type.name != "PageSnap") {
            console.error("ERROR : The component WindowsScroll accept only PageSnap as direct child !")
          }else {
            positionPages[i] = i * (windowScrollDiv.current.offsetHeight +1 )
          }
        }
        positionPagesRef.current = positionPages
    
        windowScrollDiv.current.scroll({top: positionPagesRef.current[mainPage] })
    
    
        setCurrentPageState(mainPage)
    
        window.addEventListener('wheel', snapScroll, {passive:false});
        window.addEventListener('keydown', snapScroll);
      }
    }, []);

    useEffect( () => {
      if (firstRender.current===0)
        snapScroll(undefined)
      else {
        firstRender.current -= 1;
      }
    }, [currentPageState])  
    
    return (
      <div ref={windowScrollDiv}
        style={{overflowX: scrollDirection == 'y'? 'Hidden':'auto',
                overflowY: scrollDirection == 'x'? 'Hidden':'auto',
                width: width,
                height: height,
                backgroundColor: backgroundColor,}}>
  
        {children}
  
      </div>
    )
}


export const PageSnap = ({children}) => {

  return (
    <div
        style={{width: '100%',
                height: '100%',
                marginBottom: '1px'}}>
      {children}
    </div>
  )
}