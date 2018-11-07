import React from 'react';
import styles from './app.css';
import axios from 'axios'

const client = require('./main/js/client');

export default class App extends React.Component {
 
  
  constructor(props) {
    super(props);
    this.state = {
        count: 0,
        entity: "",
        businessEntities: []
     };
    // bind all event handlers (JavaScript requirement)
    this.entityInputBoxChanged=this.entityInputBoxChanged.bind(this);  
    this.fetchBusinessEntity= this.fetchBusinessEntity.bind(this);
   } // end ctor
  
   
   increment() {
    this.setState({
      count: this.state.count + 1
    });
   }
   
   
   // event handler for entity name input box onChange
   entityInputBoxChanged(event) { this.setState({entity: event.target.value}); }    
  
  // tag::fetchBusinessEntity[]
  /*
    Submit button function.      
    Retrieves data from a REST call based on what is passed in the input box 
     then retrieves all business entitities.
     'id' a value is passed, then retrieves just that entity by that ID
  */
  fetchBusinessEntity(event) {
    console.log("---- start fetchBusinessEntity");
    console.log(this.state);
    
    // reset the state if its already populated from prior fetch
    // this will cause, if displayed, the Entities List table to be unrendered
    this.setState({businessEntities: []});
    
    
    var urlStr;
    if (this.state.entity) { // searching by a entity name
      urlStr = "/api/businessEntities/search/findByPartialEntityNameNativeQueryWithPagination?entityName=";
      urlStr = urlStr+this.state.entity;
      
      // invoke service
      /* execute in Postman and you'll see the entity._embedded.businessEntities hierarchy */       
//      client({method: 'GET', path: urlStr})
//         .done(response => {
         axios.get(urlStr)
         .then(response => {
         this.setState({
                         businessEntities: response.entity._embedded.businessEntities,
                         links: response.entity._links
                      });
      });

      
    } else if (this.state.entityId){ // searching by entity id
      urlStr = "/api/businessEntities/";
      urlStr = urlStr + this.state.entityId;

      // invoke service
      client({method: 'GET', path: urlStr})
         .done(response => {
         this.setState({businessEntities: response});
      });
                  
    }
    console.log("---- end fetchBusinessEntity");            
  }
  // end::fetchBusinessEntity[]  

  render() {

    const businessEntitiesLength  = this.state.businessEntities.length;
     
     /* Conditional rendering - https://reactjs.org/docs/conditional-rendering.html 
      * Render when we have a list of business entities (list length is >= 1)
      * or 
      * when there is just one business entity (value is stored in businessEntities.entity)
      */         
     let businessEntityForRender;
     if (this.state && this.state.businessEntities.length>=1) { // rendering list of business entities     
       businessEntityForRender = <BusinessEntitiesList businessEntities={this.state.businessEntities}
                                                       links={this.state.links}
                                                       onNavigate={this.onNavigate} 
                                                       onNavigateToSingleEntity={this.onNavigateToSingleEntity}/>
     } else if (this.state && this.state.businessEntities.entity) { // rendering single business entity
       
       /*  when searching for a business entity by id, returned values get mapped into businessEntities.entity */
       businessEntityForRender = <OneBusinessEntity oneBusinessEntity={this.state.businessEntities}
                                                    isOneBusinessEntity={this.state.isOneBusinessEntity}/>           
     }

    return (    
      <div className={styles.app}>
        <p>{ this.state.count }</p>
        <button onClick={() => this.increment()}>Increment</button>
        <div id="dedsecBody">
            <a id="body" name="body"></a>  
            <p className={styles['pageTitle']} style={{marginLeft: '20px', paddingBottom: '10px'}}> Business Search </p>
        
            <div className="mainContent" style={{minHeight:'100%', marginLeft: '36px', marginRight: '20px', paddingBottom: '40px', wordWrap: 'break-word'}}>
                <p>Business paper documents processed through: date</p>
                <div style={{marginLeft: '30px'}}>
                    <p className={styles['w3-toppad']}>Search by business name, trademark, trade name, ID or document number.</p>
                    <p><input
                         id="entity-input"                    
                         className={[styles['w3-input'], styles['w3-border'], styles['w3-round']].join(' ')} 
                         type="text"
                         onChange={this.entityInputBoxChanged}                          
                         value={this.state.entity}
                       />
                    </p>                   
                    <p><input 
                          className={[styles.w3input, styles.w3border, styles.w3round].join(' ')}                    
                          type="text"
                       />
                    </p>
                    <p><button 
                          id="searchButtonId"
                          className={styles['w3-btn-done']}
                          onClick={this.fetchBusinessEntity} >Search
                       </button>
                    </p>
                </div>
                {businessEntityForRender}
            </div> 
            <div className={styles['w3-toppad']}>
                <p className={styles['w3-toppad']}><strong>More search options:</strong></p>
                <ul className={styles['w3-ul']}>
                    <li><a href="https://www.sos.state.co.us/biz/NameCriteria.do">Name availability search</a></li>
                    <li><a href="https://www.sos.state.co.us/biz/AdvancedSearchCriteria.do">Advanced search</a></li>
                    <li><a href="https://www.sos.state.co.us/biz/bizSurveySearch.do">Business survey information search</a></li>
                    <li><a href="https://www.sos.state.co.us/biz/AdvancedTrademarkSearchCriteria.do">Trademark advanced search</a></li>
                </ul>
            </div>   
        </div>   
        <div id="dedsecFooter">
         <div className={[styles['topFixed'], styles['w3-hide-small']].join(' ')} style={{bottom: '20px'}}>
            <a href="#top"> 
              <button className={[styles['w3-btn'], styles['w3-medium'], styles['w3-wheatley'], styles['w3-hover-theSage']].join(' ')}>^ Top</button> 
            </a>
          </div>
          <div className={[styles['topFixed'], styles['w3-hide-medium'], styles['w3-hide-large']].join(' ')} style={{bottom: '1px'}}>
             <a href="#top"> 
               <button className={[styles['w3-btn'], styles['w3-medium'], styles['w3-padding-large'], styles['w3-light-grey'], styles['w3-opacity']].join(' ')} style={{opacity: '0.8'}}>^ Top</button> 
             </a>
           </div>
          
           <footer id="myFooter" style={{position: 'relative', zIndex: '0'}}>
              <div className={[styles['w3-row'], styles['w3-padding-12']].join(' ')}>
                 <div className={[styles['w3-container'], styles['w3-garrus']].join(' ')}>
                    <p className={[styles['w3-text-white']]}>Colorado Secretary of State | 1700 Broadway, Suite 200, Denver CO 80290 | <a href="tel:303-894-2200" style={{color: '#fff'}}>303-894-2200</a>
                    </p>                 
                 </div>
                 <div className={[styles['w3-container'], styles['w3-black'], styles['w3-hide-small']].join(' ')}>
                     <p className={[styles['w3-medium']]}>
                       <a className={[styles['w3-text-white'], styles['w3-hover-text-wheatley']].join(' ')} href="  https://www.sos.state.co.us/pubs/info_center/terms.html">Terms &amp; conditions</a> | 
                       <a className={[styles['w3-text-white'], styles['w3-hover-text-wheatley']].join(' ')} href="https://www.sos.state.co.us/pubs/info_center/compatibility.html">Browser compatibility</a>
                     </p>
                 </div>

              </div>
           </footer>
        
        </div>
        
      </div>
    )
  }
}

class BusinessEntitiesList extends React.Component{
  
  constructor(props) {
    super(props);
    this.handleNavFirst = this.handleNavFirst.bind(this);
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
    this.handleNavLast = this.handleNavLast.bind(this);
   }  
  
  // tag::handle-nav[]
  handleNavFirst(e){
   e.preventDefault();
   this.props.onNavigate(this.props.links.first.href);
  }
 
  handleNavPrev(e) {
   e.preventDefault();
   this.props.onNavigate(this.props.links.prev.href);
  }
 
  handleNavNext(e) {
   e.preventDefault();
   this.props.onNavigate(this.props.links.next.href);
  }
 
  handleNavLast(e) {
   e.preventDefault();
   this.props.onNavigate(this.props.links.last.href);
  }
  // end::handle-nav[]  
  
  // tag::businessEntities-list-render[]  
 render() {
  var businessEntities = this.props.businessEntities.map(businessEntity =>
   <BusinessEntity key={businessEntity._links.self.href} businessEntity={businessEntity}
                                                         onNavigateToSingleEntity={this.props.onNavigateToSingleEntity}/>
  );
  
  // links displayed under the table
  var navLinks = [];
  if ("first" in this.props.links) {
   navLinks.push(<button id="nav" key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
  }
  if ("prev" in this.props.links) {
   navLinks.push(<button id="nav" key="prev" onClick={this.handleNavPrev}>&lt;</button>);
  }
  if ("next" in this.props.links) {
   navLinks.push(<button id="nav" key="next" onClick={this.handleNavNext}>&gt;</button>);
  }
  if ("last" in this.props.links) {
   navLinks.push(<button id="nav" key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
  }  
  
  return ( 
   <div>
   <table id="busentities">
    <tbody>
     <tr>
     <th>Entity Id</th>
     <th>Entity Name</th>
     <th>Entity Type</th>
     <th>Entity Status Code</th>
     </tr>
     {businessEntities}
    </tbody>
   </table>
   <center>       
    <div>
      {navLinks}
     </div>  
   </center>
   </div>  

  )
 }
 // tag::businessEntities-list-render[]  
}

/*
* This is called by BusinessEntitiesList for rendering each business entity
*/
class BusinessEntity extends React.Component{

 constructor(props) {
   super(props);
   this.handleNavigateToSingleEntity = this.handleNavigateToSingleEntity.bind(this);
 }
 
 handleNavigateToSingleEntity(e){
   e.preventDefault();
   this.props.onNavigateToSingleEntity(this.props.businessEntity._links.self.href);
  }
 
render() {
 var businessEntity = this.props.businessEntity
 var selfLink = this.props.businessEntity._links.self.href

 var isOneBusinessEntity = this.props.isOneBusinessEntity
 return (
  <tr>
   {!isOneBusinessEntity ? ( 
     <td><a id="selfLink" href= "#" onClick={this.handleNavigateToSingleEntity}> {businessEntity.entityId} </a></td>
     ): (
     <td>{businessEntity.entityId}</td>            
   )}
  <td>{businessEntity.entityName}</td>
  <td>{businessEntity.entityType}</td>
  <td>{businessEntity.entityStatusCd}</td>
  </tr>
 )
}
/*    <td><a href= {selfLink}> {businessEntity.entityId} </a></td>
*/
}

/* -
* oneBusinessEntity.entity, because that is where the data is stored 
* 
* This is evident when you use the Chrome Developer and introspecting the shows this:
* 
* Local
*   -> this: OneBusinessEntity
*     -> props
*       ->oneBusinessEntity
*          -> entity: {entityId: 20061166326, entityName: "Journey of Hope, Inc", entityType: "DPC         ", entityStatusCd: "GOOD   ", _links: {…}, …}
*          -> headers: {Date: "Tue, 25 Sep 2018 16:05:08 GMT", Transfer-Encoding: "chunked", Content-Type: "application/hal+json;charset=UTF-8"}
*          -> raw: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
*          -> request: {method: "GET", path: "/api/businessEntities/20061166326", originator: ƒ, headers: {…}, canceled: false, …}
*          -> status: {code: 200, text: ""}
* 
* */
class OneBusinessEntity extends React.Component { 

render () {
   return(
       <table id ="businessentity">
           <tbody>
               <tr>
                 <th>Entity Id</th>
                 <th>Entity Name</th>
                 <th>Entity Type</th>
                 <th>Entity Status Code</th>
               </tr>
                <BusinessEntity key={this.props.entityId} 
                                businessEntity={this.props.oneBusinessEntity.entity} 
                                isOneBusinessEntity={this.props.isOneBusinessEntity}/>
           </tbody>
       </table>            
   )            
}
}

