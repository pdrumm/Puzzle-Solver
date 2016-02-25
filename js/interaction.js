/**
 * Created by Patrick on 2/24/2016.
 */
$(function() {
    //$('.canvas').on('click',
    //    function(e) {
    //        console.log("njafd ad");
    //        console.log(e);
    //        //liText = "Text: " + e.target.textContent;
    //        //liHTML = "HTML: " + e.target.outerHTML;
    //        //timeStamp = 'Timestamp: ' + timeConverter(e.timeStamp);
    //        //console.log(liText);
    //        //console.log(liHTML);
    //        //console.log(timeStamp);
    //        //e.target.remove();
    //    }
    //);
    var elem = document.getElementsByName('canvas'),
        elemLeft = elem.offsetLeft,
        elemTop = elem.offsetTop,
        context = elem.getContext('2d'),
        elements = [];

// Add event listener for `click` events.
    elem.addEventListener('click', function(event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        // Collision detection between clicked offset and element.
        elements.forEach(function(element) {
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                alert('clicked an element');
            }
        });

    }, false);

// Add element.
    elements.push({
        colour: '#05EFFF',
        width: 150,
        height: 100,
        top: 20,
        left: 15
    });

// Render elements.
    elements.forEach(function(element) {
        context.fillStyle = element.colour;
        context.fillRect(element.left, element.top, element.width, element.height);
    });​

});