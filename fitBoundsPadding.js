(function() {

		var oldFitBounds = google.maps.Map.prototype.fitBounds;

		google.maps.Map.prototype.fitBounds = function(bounds, opts) {
				if(opts) {
						var map     = this,
								scale   = Math.pow(2,this.getZoom());

						/* Helper methods */

						var _convertLatLngToPixel = function(latlng) {
								var proj = map.getProjection();
								var point = proj.fromLatLngToPoint(latlng);
								return {
										x: point.x * scale,
										y: point.y * scale
								}
						}

						var _convertPixelToLatLng = function(pixel) {
								var proj = map.getProjection();
								var point = new google.maps.Point(pixel.x / scale, pixel.y / scale);
								return proj.fromPointToLatLng(point);
						}

						var _getPixelBounds = function(bounds, cb) {
								if(map.getProjection()) {
										var returnVal = {
												sw: _convertLatLngToPixel(bounds.getSouthWest()),
												ne: _convertLatLngToPixel(bounds.getNorthEast())
										}
										cb(returnVal);
								}
								else {
										google.maps.event.addListener(map, 'projection_changed', function () {
												_getPixelBounds(bounds, cb);
										});
								}
						}

						var _extendBoundsByPaddingValue = function(bounds, opts) {
								_getPixelBounds(bounds, function(pxbounds) {
										for(var prop in opts) {
												switch(prop) {
												case 'left':
														pxbounds.sw.x -= opts.left;
														break;
												case 'top':
														pxbounds.ne.y -= opts.top;
														break;
												case 'right':
														pxbounds.ne.x += opts.right;
														break;
												case 'bottom':
														pxbounds.sw.y += opts.bottom;
														break;
												}
										}
										var bounds = new google.maps.LatLngBounds(_convertPixelToLatLng(pxbounds.sw), _convertPixelToLatLng(pxbounds.ne));
										oldFitBounds.call(map, bounds);
								});
						}

						_extendBoundsByPaddingValue(bounds, opts);
				}

		}
})();