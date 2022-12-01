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

### Resources

-   [StepZen Query](https://stepzen.com/docs/quick-start/with-database-postgresql)
-   [StepZen Materializer Docs](https://stepzen.com/docs/connecting-backends/stitching)
-   [Appolo Docs](https://www.apollographql.com/docs/react/data/queries/)
