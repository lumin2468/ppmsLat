import React, {createContext, useContext, useState} from 'react';

const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({children}) {
  const [userDetail, setUserDetail] = useState({});
  const [projectDetails, setProjectDetails] = useState([]);
  const baseUrl = "http://203.193.144.19/ppms/api";

  async function fetchLoggedInUser(token) {
   
    try {
      const endpoint = `${baseUrl}/logged-in-user`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const detail = await response.json();
        setUserDetail(detail.data);
      } else {
        console.error('Failed to fetch Logged In User. Status:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchProjectList(token) {
    try {
      
      const endpoint = `${baseUrl}/project-list`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const detail = await response.json();
        setProjectDetails(detail);
        console.log(`Project List Details`,detail);
        console.log('Project List Response:', detail.data);
      } else {
        console.error('Failed to fetch Project List. Status:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <ApiContext.Provider
      value={{userDetail, projectDetails, fetchLoggedInUser,fetchProjectList}}>
      {children}
    </ApiContext.Provider>
  );
}
