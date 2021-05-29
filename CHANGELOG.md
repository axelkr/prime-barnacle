# 2.6.1
- paginate additionally

# 2.6.0
- fetch parts of new topic separately so users of this client can process them separately

# 2.5.0
- provide possibility to delete a topic

# 2.4.3
- hand client possibility to close any open connections

# 2.4.2
- fix: clear timeouts afterwards

# 2.4.1
- client can determine whether there is anything left to transfer to the backend

# 2.4.0
- export only interface of event source factory, as one cannot expect this library to be run in a browser

# 2.3.1 
- latest and greatest 

# 2.3.0
- increasing wait longer for requests to finish / retry them.
- update to latest versions

# 2.2.0
- provide topic related requests

# 2.1.0
- integrate topic as a class

# 2.0.1
- provide in a different format, which is more browser-friendly

# 2.0.0
- breaking change: types and conversion are now provided by choicest-barnacle

# 1.1.9
- get types and conversion for ObjectEvent from separate package

# 1.1.8
- export type for ObjectBackEnd as well, as this is required for the definition for IHTTPClient

# 1.1.7
- remove dependency just for a type

# 1.1.6
- more fixes to allow initial server down

# 1.1.5
- more fixes.

# 1.1.4
- fixes

# 1.1.3
- handle asynchronuous requests as well

# 1.1.1
- fix: failure to create event source no longer yields a visible exception.

# 1.1.0
- tries to re-execute requests, if server cannot be connected to

# 1.0.1
- fix: provide type for IHTTPClient
- fix: correct type for IHTTPClient.get : returns observable instead

# 1.0.0
- user has to provide HTTPClient for requests
- client now processes synchronuous requests

# 0.2.0
- update to latest versions of dependencies
- client now connects with endpoint for new object events (and reconnects if that fails)
- interface for pushing requests available as well, though these are not yet implemented

# 0.1.0
- setup