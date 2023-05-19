
export const WildlifeHealthId = {
    "metadata": {
        "apiVersion": "20221206",
        "year": null,
        "id": "2042",
        "wildlifeHealthId": "WLH-2022-002019",
        "generationDate": "2022-09-04T22:54:15.609Z",
        "creator": {
            "name": "rob@plasticviking.com"
        }
    },
    "status": {
        "history": [
            {
                "status": "ASSIGNED",
                "reason": "321",
                "additionalAttributes": {}
            },
            {
                "status": "RETIRED",
                "reason": "321",
                "additionalAttributes": {}
            },
            {
                "status": "ASSIGNED",
                "reason": "312",
                "additionalAttributes": {},
                "changedAt": "2022-12-06T05:36:51.323Z"
            },
            {
                "status": "RETIRED",
                "reason": "",
                "additionalAttributes": {},
                "changedAt": "2022-12-06T05:36:57.899Z"
            },
            {
                "status": "UNASSIGNED",
                "reason": "321",
                "additionalAttributes": {},
                "changedAt": "2022-12-06T07:14:16.546Z"
            },
            {
                "status": "RETIRED",
                "reason": "Retiring this ID again",
                "additionalAttributes": {
                    "recaptureKitsReturned": true,
                    "recaptureStatus": false
                },
                "changedAt": "2022-12-20T03:45:30.449Z"
            }
        ],
    },
    "purpose": {
        "primaryPurpose": "PASSIVE",
        "secondaryPurpose": "TARGETED",
        "project": "Some Project",
        "projectDetails": "Here are the details about this project",
        "requester": {
            "firstName": "Robert",
            "lastName": "Johnstone",
            "region": "",
            "organization": "ORGANIZATION3",
            "phoneNumber": "0905646512",
            "email": "rob@plasticviking.com",
            "role": "HIGHWAY_CREW"
        }
    },
    "animalDetails": {
        "species": "Deer",
        "region": "SKEENA",
        "sex": "male",
        "identifiers": [
            {
                "type": "RECAPTURE_ID",
                "identifier": "RECAP1141",
                "additionalAttributes": {}
            },
            {
                "type": "CWD",
                "identifier": "EARCARD000003",
                "additionalAttributes": {}
            },
            {
                "type": "RAPP_TAG",
                "identifier": "RAPPEARTAG",
                "additionalAttributes": {
                    "color": "Brown",
                    "taggedEar": "left"
                }
            },
            {
                "type": "NICKNAME",
                "identifier": "Steve the deer",
                "additionalAttributes": {}
            }
        ]
    },
    "events": [
        {
            "type": "capture",
            "ageClass": "juvenile",
            "startDate": "02-09-2022",
            "endDate": "",
            "submitter": {
                "firstName": "John",
                "lastName": "Smith",
                "region": "",
                "organization": "ORGANIZATION4",
                "phoneNumber": "5551234",
                "email": "email@address",
                "role": "COMPULSORY_INSPECTOR"
            },
            "locations": [
                {
                    "type": "POPULATION_UNIT",
                    "attributes": {
                        "populationUnit": "P_UNIT3"
                    }
                },
                {
                    "type": "CITY",
                    "attributes": {
                        "city": "CITY3"
                    }
                },
                {
                    "type": "NICKNAME",
                    "attributes": {
                        "city": "CITY1",
                        "nickName": "Riverside trail"
                    }
                }
            ],
            "additionalAttributes": {
                "samplesCollected": true,
                "testResultsReceived": false,
                "samplesSentForTesting": true
            },
            "history": "Here's the history for this event"
        },
        {
            "type": "mortality",
            "ageClass": "juvenile",
            "startDate": "24-02-2022",
            "endDate": "25-02-2022",
            "submitter": {
                "firstName": "Robert",
                "lastName": "Johnstone",
                "phoneNumber": "0905646512",
                "email": "rob@plasticviking.com",
                "region": "",
                "role": "HIGHWAY_CREW",
                "organization": "ORGANIZATION4"
            },
            "locations": [
                {
                    "type": "MANAGEMENT_UNIT",
                    "attributes": {
                        "managementUnit": "M_UNIT4"
                    }
                }
            ],
            "additionalAttributes": {},
            "history": "Event 2 details"
        }
    ]
}
