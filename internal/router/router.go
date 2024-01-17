package router

import (
	"encoding/gob"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/authenticator"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/controllers"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/middleware"
)

const staticFolder = "web/build"

// New registers the routes and returns the router.
func New(auth *authenticator.Authenticator) *gin.Engine {
	router := gin.Default()

	// To store custom types in our cookies,
	// we must first register them using gob.Register
	gob.Register(map[string]interface{}{})

	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("auth-session", store))

	// load templates recursively
	files, err := loadTemplates(staticFolder)
	if err != nil {
		log.Println(err)
	}
	router.LoadHTMLFiles(files...)

	router.Static("/_app", "./"+staticFolder+"/_app")

	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/login", controllers.HandleLogin(auth))
	router.GET("/callback", controllers.HandleCallback(auth))
	router.GET("/logout", controllers.HandleLogout)
	router.GET("/api/user", middleware.IsAuthenticated, controllers.HandleUser)

	router.NoRoute(func(ctx *gin.Context) {
		r, err := regexp.Compile(`\.\w+$`)
		if err != nil {
			log.Println(err)
			return
		}
		_, filename := filepath.Split(ctx.Request.RequestURI)
		if !r.MatchString(ctx.Request.RequestURI) {
			ctx.HTML(http.StatusOK, fmt.Sprintf("%s.html", filename), nil)
		} else {
			ctx.File(ctx.Request.RequestURI)
		}
	})

	return router
}

func loadTemplates(root string) (files []string, err error) {
	err = filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		fileInfo, err := os.Stat(path)
		if err != nil {
			return err
		}
		if fileInfo.IsDir() {
			if path != root {
				loadTemplates(path)
			}
		} else if strings.HasSuffix(fileInfo.Name(), ".html") {
			files = append(files, path)
		}
		return err
	})
	return files, err
}
