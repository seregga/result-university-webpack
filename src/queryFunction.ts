type CommentType = {
    id: number;
    email: string;
  };
  

  const COMMENTS_URL  = 'https://jsonplaceholder.typicode.com/PostTypes';
  
  const getData = async (url: string): Promise<CommentType[]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  };
  
  getData(COMMENTS_URL)
    .then((data) => {
      data.forEach((CommentType) => {
        console.log(`ID: ${CommentType.id}, Email: ${CommentType.email}`);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });