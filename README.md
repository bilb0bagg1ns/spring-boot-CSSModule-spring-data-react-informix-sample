# spring-boot-CSSModule-spring-data-react-informix-sample
### Running Notes
10/30/18

1. Hit the following snag with the react client (port 3000) unable to get a response from the server (port 8080).

Access to XMLHttpRequest at 'http://localhost:8080/api/businessEntities/search/findByPartialEntityNameNativeQueryWithPagination?entityName=Hope' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

2. Reason it worked in spring-boot-spring-data-react-informix-sample is because somehow it is configured to still work though the client.

3. One possible solution that I'm researching is detailed in https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

above link demonstrates how you can have the Webpack Dev Server(3000) proxy requests intended for the API server (8080)  




### Summary:

W3C CSS that we use (at SOS) cannot be integrated into React out of the box. Bootstrap has libraries that are React enabled. However, to use W3C CSS as is, we have to use a mechanism called CSSModule.

The use of CSSModule allows us to use the W3C CSS as is, however, we still need to follow certain techniques to reference them in our react components.

### Detailed Steps
1. This is an extension of the spring-boot-spring-data-react-informix-sample application.

2. Here CSSModule is integrated which enables us to integrate custom css (w3.css). 
    - src\app.css is a CSS contains all inside it, the stylesheet content of https://www.sos.state.co.us/pubs/css/responsive.css and https://www.sos.state.co.us/pubs/css/r-theme.css
     
    - Inspiration: https://javascriptplayground.com/css-modules-webpack-react/ 
    
3. With the use of CSSModule techniques adopted from the inspiration link
 - the server now has to be started first (that would have it running on Tomcat at 8080 port).
 - the dev server has to be started separately 
 - the client is brought up on localhost:3000 


# Demonstrates use of

Spring:
1. SpringBoot
2. Spring Data
3. JPA/Hibernate
4. Informix
5. Uses default Tomcat JDBC Connection Pool


React:
1. react.js
2. rest.js - CujoJS toolkit used to make REST calls
3. webpack - toolkit used to compile JavaScript components into a single, loadable bundle
4. babel - write your JavaScript code using ES6 and compile it into ES5 to run in the browser


# Inspired By/Sourced From
1. https://spring.io/guides/tutorials/react-and-spring-data-rest/
2. https://www.mkyong.com/spring-boot/spring-boot-spring-data-jpa-oracle-example/

# Supporting Material:
1. https://spring.io/guides/gs/accessing-data-rest/
2. https://vladmihalcea.com/the-best-way-to-map-a-composite-primary-key-with-jpa-and-hibernate/

# Tools
1. Command line application
2. Service class 
3. Repository class


# Summary

# Execution


## STS 
### Server
1. With the pom.xml containing a plugin to install node and npm, noticed occasionally, I'd have to do a Project -> Clean to get app to start properly.
### Dev Server
1. In a command window change dir to the code base
2. npm dev-server.js
3. Open http://localhost:3000


## Design Details

1. Repository class extends JpaRepository extends PagingAndSortingRepository extends CrudRepository

## Exercising the Code:

### Want to see your JavaScript changes automatically? 
Run "npm run-script watch" to put webpack into watch mode. It will regenerate bundle.js as you edit the source.

### URL
1. http://localhost:8080/
   - Note this will first render a table column headers but takes a while to retrieve the data as it is searching for entityName 'Hope', which is an expensive lookup by name

### To test the APIs:

GET - http://localhost:8080/api/
GET - http://localhost:8080/api/businessEntities  - returns first 20 entities
GET  - http://localhost:8080/api/businessEntities?size=2 - returns just 2 entities now
GET - http://localhost:8080/api/businessEntities?page=2&size=4 - returns page 2 with 4 entities 
GET - http://localhost:8080/api/businessEntities/19981196785 - returns entity by id


GET - http://localhost:8080/api/businessEntities/search - returns the custom query (findByPartialEntityName{?entityName}) that we wrote in the Repository class
GET - http://localhost:8080/api/businessEntities/search/findByPartialEntityName?entityName=Hope
GET - http://localhost:8080/api/businessEntities/search/findByPartialEntityName?entityName=New Hope Community Church of Golden



1. http://localhost:8080/api/businessEntities/19981215793

Returns:
{
  "entityName" : "HOPE LUTHERAN CHURCH",
  "entityType" : "DNC         ",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/businessEntities/19871130096"
    },
    "businessEntity" : {
      "href" : "http://localhost:8080/api/businessEntities/19871130096"
    }
  }
}

2. http://localhost:8080/api/businessEntities/search   - identify all custom queries.

Following are queries defined in BusinessEntityRepository

{
  "_links" : {
    "findByEntityIdReturnStream" : {
      "href" : "http://localhost:8080/api/businessEntities/search/findByEntityIdReturnStream{?entityId}",
      "templated" : true
    },
    "findByEntityName" : {
      "href" : "http://localhost:8080/api/businessEntities/search/findByEntityName"
    },
    "findByPartialEntityName" : {
      "href" : "http://localhost:8080/api/businessEntities/search/findByPartialEntityName{?entityName}",
      "templated" : true
    },
    "self" : {
      "href" : "http://localhost:8080/api/businessEntities/search"
    }
  }
}


3. http://localhost:8080/api/businessEntities/search/findByPartialEntityName?entityName=Hope

{
    "_embedded": {
        "businessEntities": [
            {
                "entityId": 19871239542,
                "entityName": "Greeley Assembly of God DBA New Hope Christian Fellowship",
                "entityType": "DNC         ",
                "entityStatusCd": "RP_NC  ",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/businessEntities/19871239542"
                    },
                    "businessEntity": {
                        "href": "http://localhost:8080/api/businessEntities/19871239542"
                    }
                }
            },
            {
                "entityId": 19871340400,
                "entityName": "New Hope Community Church of Golden",
                "entityType": "DNC         ",
                "entityStatusCd": "GOOD   ",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/businessEntities/19871340400"
                    },
                    "businessEntity": {
                        "href": "http://localhost:8080/api/businessEntities/19871340400"
                    }
                }
            },
            {
                "entityId": 19971009577,
                "entityName": "Hope For Children, Inc.",
                "entityType": "DNC         ",
                "entityStatusCd": "GOOD   ",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/businessEntities/19971009577"
                    },
                    "businessEntity": {
                        "href": "http://localhost:8080/api/businessEntities/19971009577"
                    }
                }
            },
            {
   ....
 }    
    

