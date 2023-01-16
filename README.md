# Reddit

## Next Js, Supabase, StepZen, Apolloclient,  GraphQl, Typescript, tailwind

<img align="left" alt="NextJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
<img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" />
<img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" />

<img align="left" alt="Tailwind" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" />
<img align="left" alt="graphql" width="30px" style="padding-right:10px;" src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" />
<br/>
<br/>

A "Reddit clone" built using Next.js, Firebase, NextAuth, and GraphQL is a highly scalable, real-time, and dynamic social media website that closely mimics the features and user experience of the original Reddit website. Next.js handles the server-side rendering of the website, making it highly performant and SEO-friendly. Firebase is used as the backend for the website, providing a real-time database, user authentication, and hosting services. NextAuth is used to handle user authentication and authorization, allowing users to log in and register securely. GraphQL is used as the API for the website, providing a flexible and efficient way to retrieve and manipulate data. This combination of technologies allows for a smooth and responsive user experience, allowing users to easily create and interact with posts, and vote and comment on them.


Check out the [Live Demo](https://reddit-next-app.vercel.app/)

## Features
- Voteing feature for each posts
- Posting and createing new subreddits
- Commenting on each posts

## Skills Aquired

-   Stepzen
-   Complex Satabase Shema Creation
-   GraphQl Fundamentals

### Challenges 
- As this application has a lot of moveing parts it was very challengeing to keep track of everything. But it was very enjoyable as well as i got to try out so many different technologies.

- By far the most time taken for me was comeing up with schemas for graphql and also the relationships for the database. But this was made easy with the help of stepzen.

### Problems

-   when i was setting up apollo graphql i was bombarded with '''Syntax Error: Expected "$", found Name "topic".'''. I found the solution [here](https://stackoverflow.com/questions/48331103/graphql-gql-syntax-error-expected-name-found)

-   Createing the relation in the database was one of the tougest challenge in this project. When i was working on subreddit/[subreddit].tsx page to get the right posts took me a while to figure out. I was making a relation like
    '''
    SELECT \* , "Post".id as id from "Post"
    join "subreddit" on "Post".id = "subreddit".id
    order by "Post".created_at desc
    '''

    when it was
    '''SELECT \*, "Post".id as id from "Post"
    join "subreddit" on "Post".subreddit_id = "subreddit".id
    order by "Post".created_at desc '''
    if you noticed i was createing a relation in the wrong column it was "Post".subreddit_id = "subreddit".id not "Post".id = "subreddit".id

-   When implementing the votes feature i was getting an error with message "Rendered more hooks than during the previous render (React)" this was solved by the help of this [blog](https://bobbyhadz.com/blog/react-rendered-more-hooks-than-during-previous-render)
    I had to move the render method when the page was loading to the bottom

### Resources

-   [StepZen Query](https://stepzen.com/docs/quick-start/with-database-postgresql)
-   [StepZen Materializer Docs](https://stepzen.com/docs/connecting-backends/stitching)
-   [Appolo Docs](https://www.apollographql.com/docs/react/data/queries/)

### ScreenShots

<img width="1680" alt="Screen Shot 2022-12-02 at 10 54 30 AM" src="https://user-images.githubusercontent.com/76642519/205429673-721bf984-a440-4657-97c5-555d9ffce909.png">

<img width="1680" alt="Screen Shot 2022-12-02 at 10 54 39 AM" src="https://user-images.githubusercontent.com/76642519/205429677-8faf9e97-b975-4afc-a4b5-3a089f4fba05.png">

<img width="1680" alt="Screen Shot 2022-12-03 at 11 12 50 AM" src="https://user-images.githubusercontent.com/76642519/205429680-4f590630-ffa6-44e0-9110-27c71d599b47.png">

<img width="1627" alt="Screen Shot 2022-12-03 at 11 13 08 AM" src="https://user-images.githubusercontent.com/76642519/205429688-568e8bf4-8934-4545-a19a-f1a867f15384.png">

<img width="1627" alt="Screen Shot 2022-12-03 at 11 13 32 AM" src="https://user-images.githubusercontent.com/76642519/205429691-517c4235-90ce-4909-b874-e430a062ea8c.png">

<img width="1006" alt="Screen Shot 2022-12-03 at 11 14 17 AM" src="https://user-images.githubusercontent.com/76642519/205429692-0089f2b3-45d8-4173-8709-c7c3564c12f6.png">

<img width="1680" alt="Screen Shot 2022-12-03 at 11 14 56 AM" src="https://user-images.githubusercontent.com/76642519/205429701-cb718955-03bc-4ee6-94ee-2419642ec029.png">








