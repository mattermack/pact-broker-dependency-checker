# pact-broker-dependency-checker
Client to ask Pact Broker what applications can work with a given application on what version

## How to run
`nodejs ./src/index.js --providerName='P' --providerVersion='2.0.7' --consumerName='B' --consumerVersion='4.1.3'`

Output: "Error"

Error Code: 2


`nodejs ./src/index.js --providerName='P' --providerVersion='2.0.7' --consumerName='B' --consumerVersion='4.1.2'`

Output: "Fail"

Error Code: 1


`nodejs ./src/index.js --providerName='P' --providerVersion='2.0.7' --consumerName='B' --consumerVersion='4.1.1'`

Output: "Pass"

Error Code: 0 
