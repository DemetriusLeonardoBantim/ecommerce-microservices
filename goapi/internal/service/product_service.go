package services

import (
	"github.com/DemetriusLeonardoBantim/ecommerce-microservices/goapi/internal/database"
	"github.com/DemetriusLeonardoBantim/ecommerce-microservices/goapi/internal/entity"
)

type ProductService struct {
	ProductDB database.ProductDB
}

func NewProductService(productDB database.ProductDB) *ProductService {
	return &ProductService{ProductDB: productDB}
}

func (ps *ProductService) GetProducts() ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProducts()
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) GetProduct(id string) (*entity.Product, error) {
	product, err := ps.ProductDB.GetProduct(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (ps *ProductService) GetProductByCategoryID(categoryID string) ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProductByCategoryID(categoryID)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) CreateProduct(name, description, categoryID, imageURL string, price float64) (*entity.Product, error) {
	product := entity.NewProduct(name, description, categoryID, imageURL, price)

	createdProduct, err := ps.ProductDB.CreateProduct(product)
	if err != nil {
		return nil, err
	}
	return createdProduct, nil
}
