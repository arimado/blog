#Blog Express

This is a blog to learn stuff about:
- querying and writing to a mongo database
- routes and middleware
- creating a REST API
- user authentication
- single-page applications
- Promises

Current Stack: Node, Express, Mongo, Handlebars

## Not sure about
- How different middleware callback functions work on the route.
- Promises (seems like method chaining with success/failure control flow?) Also, do they work in ES5?
- Is there a way I can make route variables accessible to all routes? Currently I'm defining a user property in every route:

<pre><code>
router.get('/create', function(req, res, next) {
    res.render('create-post', { title: 'Create', user: req.user });
});
</code></pre>


## To do's
- Add post validation
- Fix admin routes in the routes/admin.js
- Add material design styles
