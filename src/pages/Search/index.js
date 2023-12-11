import "./index.css"

export function Search() {
    return (
       <div class="form-outline align-middle cursor">
            <div class="row">
                <div class="col-11">
                    <input type="search" id="form1" class="form-control" placeholder="Search a song..." aria-label="Search"/>
                </div>
                <div class="col-1">
                    <button type="submit" className="btn text-white btn-md button-submit regular">
                        Submit
                    </button>
                </div>
            </div>
        </div>
        // submit button needs to make a request to spotify-service to get the songs from the spotify api
        // once we get those results, need to loop through their stuff & make each individual song
        // link to their details page
        //TODO: need to figure out how to regenerate access token
       // curl --request GET   --url 'https://api.spotify.com/v1/search?q=rich&type=track'   --header 'Authorization: Bearer BQATrkBaAVe-_wc-KydN_mT1X0wcZb4XmYzUJvsuCRwLRl_n5ElJT9X7m_sr3Ob4oB0mpj7nU2wXrKgtV7KwaQ6AV-dt0ArTzMmS66uwnJ526om9saI'
    )
}