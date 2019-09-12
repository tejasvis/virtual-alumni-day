/**
 * Scrolls the grid vertically when either the top or bottom limits
 * of the grid has been reached.
 */
function scrollWhenGridLimitIsReached( event )
{
    // scroll GRID UP to its bottom limit ...
    if ( hasReachedGridBottom() )
    {
        var gridRowHeight = getGridBottomRow().height();
        var prevScrollPos = $( window ).scrollTop();


        appendToGridBottom( getGridTopRow() );
        $( window ).scrollTop( prevScrollPos - gridRowHeight );
    }

    // scroll GRID DOWN to its top limit ...
    else if ( hasReachedGridTop() )
    {
        var gridRowHeight = getGridTopRow().height();


        prependToGridTop( getGridBottomRow() );
        $( window ).scrollTop( gridRowHeight );
    }
}


/**
 * Position the document to facilitate initial scrolling.
 */
function setInitScrollPosition()
{
    $( document ).ready( $( window ).scrollTop( 1 ) );
}


/********************
 * HELPER FUNCTIONS...
 ********************/

/**
 * Get the grid's top row.
 *
 * @return { row} the top row.
 */
function getGridTopRow()
{
    // return grid's TOP ROW...
    var topRow = $( "#grid > div.row:first" );

    return topRow;
}


/**
 * Get the grid's bottom row.
 *
 * @return { row} the bottom row.
 */
function getGridBottomRow()
{
    // return grid's BOTTOM ROW...
    var bottomRow = $( "#grid > div.row:last" );

    return bottomRow;
}


/**
 * Append row to grid's bottom.
 *
 * @param row
 */
function appendToGridBottom( row )
{
    var grid = $( "#grid" );

    // append row to grid's bottom...
    grid.append( row );

}


/**
 * Append row to grid's top.
 *
 * @param row
 */
function prependToGridTop( row )
{
    var grid = $( "#grid" );

    // append row to grid's top...
    grid.prepend( row );
}


/**
 * Has the grid scrolled to its bottom?
 *
 * @returns {boolean} TRUE if grid has scrolled-up revealing its bottom end; FALSE otherwise
 */
function hasReachedGridBottom()
{
    var windowHeight;       // height of the browser window
    var scrollUpHeight;     // amount by which window contents have scrolled up
    var documentHeight;     // length of the entire document which includes grid

    windowHeight = $( window ).height();
    scrollUpHeight = $( window ).scrollTop();
    documentHeight = $( document ).height();

    // return whether grid has scrolled to its bottom...

    // log to the console...
    // var consoleLog = "ScrollTop: " + $( window ).scrollTop() + ' + ' +
    //                  "Window Height: " + $( window ).height() + " = " +
    //                  ($( window ).scrollTop() + $( window ).height());
    // console.log( consoleLog );

    return areNearlyEqual( (windowHeight + scrollUpHeight), documentHeight );
}


/**
 * Has the grid scrolled to its top?
 *
 * @returns {boolean} TRUE if grid has scrolled-down revealing its top end; FALSE otherwise.
 */
function hasReachedGridTop()
{
    var scrollUpHeight;     // amount by which window contents have scrolled up

    scrollUpHeight = $( window ).scrollTop();

    // return whether grid has scrolled to its top...
    // return scrollUpHeight === 0;
    return areNearlyEqual( scrollUpHeight, 0 );
}


/**
 * Compare two numbers for "NEAR equality", meaning the difference between
 * the two given values is no more than 1.
 *
 * @param val1 1st (real) number
 * @param val2 2nd (real) number
 *
 * @returns {boolean} TRUE if the numbers are NEARLY equal; FALSE otherwise.
 */
function areNearlyEqual( val1, val2 )
{
    return Math.abs( Math.round( val1 ) - Math.round( val2 ) ) <= 1;
}