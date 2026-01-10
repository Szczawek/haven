package argonPassword

import (
	"github.com/alexedwards/argon2id"
)

func Hash(password string) (string, error) {
	hash, err := argon2id.CreateHash(password, argon2id.DefaultParams)
	return hash, err
}

func UnHash(password string, hash string) error {
	_, err := argon2id.ComparePasswordAndHash(password, hash)
	return err
}
