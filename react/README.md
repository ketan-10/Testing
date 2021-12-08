# React

- Blog: [How does React Hooks re-renders a function Component?](https://medium.com/swlh/how-does-react-hooks-re-renders-a-function-component-cc9b531ae7f0)

- [REACT MEMO vs USECALLBACK vs USEMEMO](https://youtu.be/uojLJFt9SzY)

- [Build Custom React Router](https://dev.to/ogzhanolguncu/build-a-custom-react-router-from-scratch-180h)

- [Using Redux and Context API](https://www.codehousegroup.com/insight-and-inspiration/tech-stream/using-redux-and-context-api)

- [Immer Tutorial | Immer and React Match Made in Heaven](https://youtu.be/8kC5fHlir4E)

Calling a function component returns a Shadow DOM Builder object, the Builder is not directly called first time <br>
It internally calls render on the builder, when it does react keep track of the current component which is being rendered in a global variable, <br>
i.e any hooks like `useState` called in this process will be attached/closed to the current rendering component  <br>
so the current rendering component is closed under the function `setState()` <br>

For context API it is similar, i.e when a component renders it's stored temporarily in a global variable, <br>
and when we call `useContext(MyContext)` somewhere, it knows that the current component is bind/subscribed to `MyContext`. <br>
So for any reason when `MyContext.Provider` re-renders, it will re-render all the components bind/subscribed to `MyContext`


**Notes**

- If parent components render, all it's child automatically render, unless they are wrapped under `React.memo()`
- Using Context API just adding a hook, can make that exact component re-render, whenever `context.Provider` re-renders.

**Functional-programing concept**

- [Functional Programming in 40 Minutes • Russ Olsen • GOTO 2018](https://youtu.be/0if71HOyVjY)

## **Single Page Applications and lazy loading**

- [The Drawback of Client Side Rendering](https://youtu.be/xTsYYxf2Ut0)

- [Are single-page-applications better than multi-page-applications? - HTTP 203](https://youtu.be/ivLhf3hq7eM)

1) in ssr/mpa -> server have to render each page 
2) in spa -> we can use ajax
	but this will require whole javascript to be loaded
	it cant stream the load

	next.js fix that, by double loading the data 
	i.e render on server-side (either i) each user request if your data is on the home page 
		ii) once and cash on the server)

github -> loading
3) Streaming as pages get downloaded.
Streaming page is not possible with SPA, as if we are using history-api for routing.
when we click a link, 
i) some code will run (on the current page)
ii) some code (for new page ) will be downloaded 
iii) the code will (react) run of new page to construct the dom and finally display 

next js also can't solve this as there is no pre page loading (server side rendering) for history API 
if Page is huge we can break the page in a few part and lazy load it with Code-Splitting, it will still go through all 3 steps but for small parts of page


## **How it works**

If we create a table with jquery way, <br>
How will we update the table if data changes?? <br>
If we create a new dom for the entire table each time data is updated, There will be unnecessary dom element creation. <br>
Otherwise, we have to write huge logic to locate the changed element and update that element. <br>
What if we just change the element in virtual DOM and create a common code to lookup for changes and update the real DOM that's React. <br>

- [How React Works behind the scenes - Pluralsight audition](https://youtu.be/gApwC9Ek9yo)
- [Learn to Code: How React.js Works](https://youtu.be/mLMfx8BEt8g)
- [Does the browser re-render the whole page on changes or only the specific elements?](https://stackoverflow.com/questions/25464939/does-the-browser-re-render-the-whole-page-on-changes-or-only-the-specific-elemen)
