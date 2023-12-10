import "./index.css"

export function Search() {
    return (
       <div class="form-outline align-middle cursor">
            <div class="row">
                <div class="col-11">
                    <input type="search" id="form1" class="form-control" placeholder="Search a song..." aria-label="Search"/>
                </div>
                <div class="col-1">
                    <button type="submit" className="btn btn-secondary btn-md button-submit regular">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}