package blog

import (
	"api/roots/database"
	"encoding/json"
	"net/http"
    "math/rand"
)

type PostTemp struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Content string `json:"content"`
}

//Algo for searching to update
func GetPosts(res http.ResponseWriter, req *http.Request) {
	var listOfPosts []PostTemp

	cmd := "SELECT users.id, users.name, posts.content FROM posts LEFT JOIN users ON posts.userID = users.id WHERE users.id IN (?,?,?,?,?)"
    nums := Randomizer();
	rows, err := db.DB.Query(cmd,nums[0],nums[1],nums[2],nums[3],nums[4]);
	if err != nil {
		http.Error(res, "Database error, Can't find posts", http.StatusInternalServerError)
		return
	}

	for rows.Next() {
		var post PostTemp
		if err := rows.Scan(&post.ID, &post.Name, &post.Content); err != nil {
			http.Error(res, "Database error/ type error", http.StatusInternalServerError)
			return
		}
		listOfPosts = append(listOfPosts, post)
	}
	defer rows.Close()

	if err := json.NewEncoder(res).Encode(listOfPosts); err != nil {
		http.Error(res, "Json error", http.StatusInternalServerError)
	}
}

func Randomizer() []int {
    var nums []int;
    for i := 0; i < 10; i++ {
        nums = append(nums, rand.Intn(10));
    }
    return nums;
}
