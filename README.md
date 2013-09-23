fitBoundsPadding
================

A patch for the Google Maps JS API v3 to enable padding on fitBounds

Just include fitBoundsPadding.js or fitBoundsPadding.min.js after the Google Maps API is called. 


Usage
-----

Use identically to fitBounds. If you want to use padding, it takes an object as the 2nd parameter. 

    map.fitBounds(bounds, { left: 300, top: 20 });
    
This would add 300 pixels of padding to the left of the map and 20 pixels of padding to the top. Percentages are not yet supported, but are planned. fitBounds may also be called without padding; at this point it functions identically to the standard API
