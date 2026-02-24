package blog

import(
    "net/http"
    "encoding/json"
    "api/roots/database"
)

type PostStruct struct {
    UserID int `json:"userID"`
    Content string `json:"content"`
}

func AddPost(res http.ResponseWriter, req *http.Request) {
    //!important
    //Add Function whitch, will be checking if id from  POST UserID is the same as from cookies
    // user session
    defer req.Body.Close();
    var post PostStruct;
    if err := json.NewDecoder(req.Body).Decode(&post); err != nil {
        http.Error(res,"JSON error", http.StatusInternalServerError);
        return;
    }
    cmd := "INSERT INTO posts(content,userID) VALUES(?,?)"
    _, err := db.DB.Exec(cmd, post.Content, post.UserID);
    if err != nil {
        http.Error(res, "Database error; Incorrect Input Data", http.StatusInternalServerError);
        return;
    }
    json.NewEncoder(res).Encode("Posted!");
}
