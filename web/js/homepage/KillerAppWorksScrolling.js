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


        //alert( "SCROLL_TOP at: " + $( window ).scrollTop() );
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
    $( document ).ready( $( window ).scrollTop( 1) );
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

    var
            topRow = $(),                               // will hold the cells of the top row (starts empty)
            viewportWidth = $( "#grid" ).innerWidth(),   // width of the browser's viewport
            currentCell = $( '.gridCell:first' );       // the current cell (starts at first cell in grid)


    // collect the cells for the top row...
    while ( (getTotalCellWidths( topRow ) + $( currentCell ).innerWidth()) < viewportWidth )
    {
        // collect the current cell of the top row...
        topRow = $( topRow ).add( currentCell );

        // move to next cell in row...
        currentCell = $( currentCell ).next();
    }

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

    var
            bottomRow = $(),                            // will hold the cells of the bottom row (starts empty)
            viewportWidth = $( "#grid" ).innerWidth(),   // width of the browser's viewport
            currentCell = $( '.gridCell:last' );        // the current cell (starts at last cell in grid)


    // collect the cells for the bottom row...
    while ( (getTotalCellWidths( bottomRow ) + $( currentCell ).innerWidth()) < viewportWidth )
    {
        // collect the current cell of the bottom row...
        bottomRow = $( bottomRow ).add( currentCell );

        // move to previous cell in row...
        currentCell = $( currentCell ).prev();
    }

    return bottomRow;
}


/**
 * Get the total width (in pixels) of the collection of cells.
 *
 * @param row {object} collection of cells
 *
 * @return {int} total width of all cells in the given collection
 */
function getTotalCellWidths( cells )
{
    var totalCellWidths = 0;    // sum of the widths of all cells in collection



    // calculate sum of all cell widths...
    $( cells ).each( function ( idx, cell ) {
        totalCellWidths += $( cell ).innerWidth();
    } );

    return totalCellWidths;


}


/**
 * Append row to grid's bottom.
 *
 * @param row {object} row of grid cells
 */
function appendToGridBottom( row )
{
    var grid = $( "#grid > div.row-align" );

    // append row to grid's bottom...
    grid.append( row );

}


/**
 * Append row to grid's top.
 *
 * @param row {object} row of grid cells
 */
function prependToGridTop( row )
{
    var grid = $( "#grid > div.row-align" );

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
 * Compare two numbers for "NEAR equality," meaning the difference between
 * the given two values are no further than 1.
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
