package db

import (
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
	"os"
)

// LOG FATAL IS TEMPORARY!
// is is shout-downing server; it's bad idea;
// Variable for pulling db in different places;
var DB *sql.DB

// Connection with database;
func Init() error {
	conf := mysql.NewConfig()
	conf.User = "root"
	conf.Passwd = "9goFK18O7XNFZI"
	conf.DBName = "garden"
	conf.Net = "tcp"
	conf.Addr = os.Getenv("DB_ADDR")

	//#Litle digresion;
	//better to have var than :=(inferior); Var gives option to asing value for it,
	//in inferior is needed new variable only for asign its value to an existenc variable(not worthy);
	var err error
	DB, err = sql.Open("mysql", conf.FormatDSN())
	if err != nil {
		return err
	}

	if err := DB.Ping(); err != nil {
		return err
	}
	fmt.Println("MYSQL connected!")
	return nil
}
