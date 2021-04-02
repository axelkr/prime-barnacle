# v2.4.0
- export only interface of event source factory, as one cannot expect this library to be run in a browser

# v2.3.1 
- latest and greatest 

# v2.3.0
- increasing wait longer for requests to finish / retry them.
- update to latest versions

# v2.2.0
- provide topic related requests

# v2.1.0
- integrate topic as a class

# v2.0.1
- provide in a different format, which is more browser-friendly

# v2.0.0
- breaking change: types and conversion are now provided by choicest-barnacle

# v1.1.9
- get types and conversion for ObjectEvent from separate package

# v1.1.8
- export type for ObjectBackEnd as well, as this is required for the definition for IHTTPClient

# v1.1.7
- remove dependency just for a type

# v1.1.6
- more fixes to allow initial server down

# v1.1.5
- more fixes.

# v1.1.4
- fixes

# v1.1.3
- handle asynchronuous requests as well

# v1.1.1
- fix: failure to create event source no longer yields a visible exception.

# v1.1.0
- tries to re-execute requests, if server cannot be connected to

# v1.0.1
- fix: provide type for IHTTPClient
- fix: correct type for IHTTPClient.get : returns observable instead

# v1.0.0
- user has to provide HTTPClient for requests
- client now processes synchronuous requests

# v0.2.0
- update to latest versions of dependencies
- client now connects with endpoint for new object events (and reconnects if that fails)
- interface for pushing requests available as well, though these are not yet implemented

# v0.1.0
- setup