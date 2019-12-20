# Kei and Aedan's Enigma Server


Live app: https://petful-aedan-kei.now.sh/

Client GitHub: https://github.com/thinkful-ei-heron/DSA-Petful-Client-Kei-Aedan

## API
_________
Unprotected-Endpoints
_____________________

`GET /cats` Retrieves the information of the first cat in the queue, the next cat to be adopted. Returns an imageURL, imageDescription, name, sex, age, breed, and story. 

`DELETE /cats` Dequeues the first cat in the adoption queue, meaning that this cat has been adopted! Hooray.

`GET /dogs` Retrieves the information of the first dog in the queue, the next cat to be adopted. Returns an imageURL, imageDescription, name, sex, age, breed, and story. 

`DELETE /dogs` Dequeues the first dog in the adoption queue, meaning that this dog has been adopted! Hooray. 

`GET /humans` Retrieves the entire queue of people who are in line ot adopt a pet. 

`DELETE /humans` Dequeues the first human in the adoption queue, meaning this human has adopted their pets and
is going home. 

`POST /humans` Enqueues the human into the adoption queue. 
_____

## Summary

This server allows for the storage and retrieval of users who are interested in adopting pets. The server
also stores information on pets that are yet to be adopted.

## Technology Used

Javascript, PostgreSQL, Express, Mocha, Chai

<b>Back-end:<b>
<ul>
  <li>Node</li>
  <li>Express</li>
  <li>Mocha</li>
  <li>Chai</li>
</ul>

## Notes

This server continually kicks users from the front of the queue to the back of the queue after 5 seconds. 
