export default class MoviesAnalyzer {
    constructor(movies, users) {
        this.movies = movies;
        this.users = users;
    }

    topRatedMoviesAmongFriends(userId) {
        // TODO: Implement

        let user = this.users.find(u => u.userId == userId)
        let friends = user.friends

        let ratedMovies = []

        for(let i=0; i<friends.length; i++){
            let _movies = this.movies.filter(movie => movie.ratings.some(r => r.userId == friends[i])).map(n => {
                let rate = n.ratings.find(r => r.userId == friends[i])
                return {title: n.title, rating: rate.rating}
            })
            ratedMovies.push(_movies)
        }

        let movieRatings = {}

        ratedMovies.forEach(movies1 => {
            movies1.forEach(rm => {
                if(movieRatings[rm.title]){
                    let rating = movieRatings[rm.title]
                    rating = (rm.rating + rating) / 2
                    movieRatings[rm.title] = rating
                } else {
                    movieRatings[rm.title] = rm.rating
                }
            })
            
        });

        let avgRatings = Object.entries(movieRatings).sort( (a,b) => {
            let diff = b[1] - a[1]
            if(diff == 0) return a[0].localeCompare(b[0])
            return diff
        })

        let top3movies = avgRatings.slice(0,3).map(m => m[0])

        return top3movies
    }
}
