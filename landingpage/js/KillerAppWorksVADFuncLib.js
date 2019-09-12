/**
 * Used to store user session info.  It uses cookies to persist
 * data as key-value pairs.
 *
 * Include the following javascript library in your HTML head element:
 * "<script src = "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"> </script>"
 *
 * @constructor
 */
function VADSession()
//TODO: Allow to set an expiry date to session...
//TODO: Allow to set domain/path to session...
{
    /**
     * Get the value associated with given session key.
     *
     *  @param  {string} key - the key name
     *  @return {string} the key's value
     */
    this.getValue = function ( key ) {
        return Cookies.get( key );
    };


    /**
     * Get all session key-value pairs.
     *
     * @return {object} containing list of all session key-value pairs.
     */
    this.getAllKeyValuePairs = function () {
        return Cookies.get();
    }

    /**
     * Assign the value to the key and store them in this
     * session.
     *
     * @param key {string} the key to store
     * @param val {string] the value to store
     *
     * @return (string) status message
     */
    this.setSingleKeyValue = function ( key, val ) {
        // store key-value pair in session...
        Cookies.set( key, val );

        return 'Setting key-value pair: "${key}:${val}"'
                .replace( "${key}", key )
                .replace( "${val}", val );
    };

    /**
     * Store all key-value pairs in this session.
     *
     * @param obj {object} object of key-value pairs
     *
     * @returns (string) status message
     */
    this.setMultipleKeyValues = function ( obj ) {
        let key;

        // copy key-value pairs into session...
        for ( key in obj )
        {
            Cookies.set( key, obj[key] );
        }

        return 'Current collection of key-value pairs: ${key-value-pairs}'
                .replace( "${key-value-pairs}", obj.toString() )
    };

    /**
     * Does this session contain the given key?
     *
     * @param searchKey {string} key - the key to search
     *
     * @returns (boolean) TRUE if key is found, otherwise FALSE
     */
    this.containsKey = function ( searchKey ) {
        for ( key in Cookies.get() )
        {
            if ( key === searchKey )
                return true;
        }

        return false;

    };

    /**
     * Does this session have a valid value assigned to the given key?
     * A valid value is non-null, non-empty and non-whitespace.
     *
     * @param   {string} key - the key to search
     *
     * @returns (boolean) TRUE if valid, otherwise FALSE
     */
    this.hasValidValue = function ( key ) {

        var foundValue = Cookies.get( key );

        return foundValue !== null &&
               foundValue !== undefined &&
               foundValue.trim() !== "";
    };

    /**
     * Is the VAD user already logged in?
     *
     * @return {boolean} TRUE if "checked-in", otherwise FALSE
     */
    this.isAlreadyCheckedIn = function () {
        // load user session info...
        var id = "crmId";
        var fName = "firstName";
        var lName = "lastName";

        // determine whether user is checked-in...
        var isCheckedIn = vadSession.hasValidValue( id ) &&
                          vadSession.hasValidValue( fName ) &&
                          vadSession.hasValidValue( lName );


        // if user is already "checked-in"...
        if ( isCheckedIn )
        {
            return true;
        }

        // else...
        return false;
    };


}




