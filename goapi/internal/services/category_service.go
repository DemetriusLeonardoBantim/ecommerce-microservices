package services

import "github.com/DemetriusLeonardoBantim/ecommerce-microservices/goapi/internal/database"

type CategoryService struct {
	CategoryDB database.CategoryDB
}

func NewCategoryService(categoryDB database.CategoryDB) *CategoryService {
	return &CategoryService{CategoryDB: categoryDB}
}
