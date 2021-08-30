import { makeVar, InMemoryCache } from "@apollo/client";
//import {cartItemsVar} from '../comps/Session'


//export default x;


export const cache = new InMemoryCache({

  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            //return cartItemsVar();
            return ''
          }
        },
        // launches: {
        //   keyArgs: false,
        //   merge(existing, incoming) {
        //     let launches = [];
        //     if (existing && existing.launches) {
        //       launches = launches.concat(existing.launches);
        //     }
        //     if (incoming && incoming.launches) {
        //       launches = launches.concat(incoming.launches);
        //     }
        //     return {
        //       ...incoming,
        //       launches
        //     };
        //   }
        // }
      }
    }
  }
});

//const [isLoged, setIsLoged] = useState()


// export default class cartItemsVar extends Component { 
//   componentDidMount(){
//     makeVar(localStorage.getItem('token'))
//   }
//   render(){
//   }
// };

//export const cartItemsVar = makeVar<string[]>([]);