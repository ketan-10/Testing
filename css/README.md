### `git subtree push --prefix css origin gh-pages`

[Conquering Responsive Layouts - Kevin Powell](https://courses.kevinpowell.co/courses/conquering-responsive-layouts)

[FlexBox help](https://flexbox.help/)

[em rem] (https://www.youtube.com/watch?v=_-aDOAMmDHI)

use-case: 

1) <p>if you use em on a generic (parent) (first in css) class. <br> and set the font size latter on, it will use the new size </p> <p>so you can reuse the parent class, for different forms of child you can just change the font-size</p>

```html
<button class="btn btn--small">Click</button>
```
```css
.btn {
  font-size: 2rem;
  padding: 1.5em;
  border-radius: 0.5em;
  margin: 1rem;
}

.btn--small {
  font-size: 1rem;
}
```

properties like margin-padding inherit same element font-size, when used with 'em'
but if em is used on font-size itself it will inherit from int's parent.

tip: 
padding use 'em' -> specific to that element (button)
margin use 'rem' -> between elements



2) 
use 'rem' for font-size -> so size does not cascade
and 'em' for others  -> reduces the code, just by changing the font-size, you can have new version of the same element(button) but small. 
// if the element is replicated, it will not 

3) 
max-width : lines should not stretch the very long, they are hard to read 
min-height : even for small text height should not go below that;
// NOTE: if min/max is set your might get confused why your height/width is not working -> as it is caped above somewhere



4) 
width: 600px; max-width: 100%;
width: 100%; max-width: 600px;
1) width is 600px but it cant go bigger than 100%
2) width is 100% but it cant go bigger than 600px