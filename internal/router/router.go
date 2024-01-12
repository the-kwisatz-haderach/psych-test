package router

import (
	"encoding/gob"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/authenticator"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/controllers"
)

// New registers the routes and returns the router.
func New(auth *authenticator.Authenticator) *gin.Engine {
	router := gin.Default()

	// To store custom types in our cookies,
	// we must first register them using gob.Register
	gob.Register(map[string]interface{}{})

	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("auth-session", store))

	// router.Static("/public", "web/static")
	router.Static("/public", "web/static")
	router.LoadHTMLGlob("web/template/*")

	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/login", controllers.HandleLogin(auth))
	router.GET("/callback", controllers.HandleCallback(auth))
	router.GET("/logout", controllers.HandleLogout)

	return router
}
