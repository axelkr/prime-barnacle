# nextVersion
- (tries to re-execute requests, if server down)

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