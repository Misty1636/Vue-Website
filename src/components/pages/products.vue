<template>
  <div>
     <loading :active.sync="isLoading">
        <template slot="default">
          <!-- <span class="display-4"><i class="fas fa-crosshairs fa-spin"></i></span> -->
          <img src="../../assets/003.gif"   >
        </template>
     </loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th> 
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="150">編輯</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td class="text-center">
            <span v-if="item.is_enabled==1" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-primary btn-sm"  @click="openModal(false,item)">編輯</button> 
              <button class="btn btn-outline-danger btn-sm"  @click="delopenModal(item)">刪除</button> 
            </div>
          </td>
        </tr>
      </tbody>
    </table> 


    <Pagination :pages="pagination" @thePage="getProducts" class="d-flex justify-content-center"/>
    
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"  @click.prevent="getProducts(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for=" page in pagination.total_pages" :key="page" :class="{active : pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{disabled: !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>  -->

    <!-- Modal -->
    <!-- <div class="modal fade" id="productsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="temProducts.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-pulse" v-if="status.uploadloading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" alt="" :src="temProducts.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="temProducts.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="temProducts.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="temProducts.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="temProducts.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="temProducts.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述"  v-model="temProducts.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="temProducts.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="temProducts.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProducts">確認</button>
          </div>
        </div>
      </div>
    </div> -->

    <ProductsModal :theProducts="temProducts" :uploadStatus="status" @sendupdate="updateProducts" @uploadImg="uploadFile"/>

    
    <DeleteModal :deleteName="temProducts" @deleteCurrent="deleteProducts"/>
    <!-- <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{temProducts.title}} </strong> 商品(刪除後將無法恢復)。 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProducts"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>       -->

  </div>
</template>


<script>
import Pagination  from '../pagination'
import DeleteModal  from '../deleteModal'
import ProductsModal from '../productsModal'

export default {
  data(){
    return{
      products: [],
      pagination:{},
      temProducts: {},
      isNew: false,
      isLoading: false,
      status:{
        uploadloading:false
      }
    }
  },
  components:{
    Pagination,
    DeleteModal,
    ProductsModal
  },
  methods: {
    getProducts(page=1){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUS}/admin/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response)=>{
        console.log(response.data)
        vm.isLoading = false
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    openModal(isNew,item){
      if(isNew){
        this.temProducts = {}
        this.isNew = true
      } else {
        this.temProducts = Object.assign({},item)
        this.isNew = false
      }
      $('#productsModal').modal('show')
    },
    updateProducts(){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUS}/admin/product`
      let httpmethods = 'post'
      const vm = this
      if(!vm.isNew){
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUS}/admin/product/${vm.temProducts.id}`
        httpmethods = 'put' 
      }
      this.$http[httpmethods](api,{data:vm.temProducts}).then((response)=>{
        // console.log(response.data)
        // vm.products = response.data.products
        if(response.data.success){
          $('#productsModal').modal('hide')
          vm.getProducts()
        } else{
          vm.getProducts()
          console.log('失敗')
        }
      })
    },
    delopenModal(item){
      this.temProducts = Object.assign({},item)
      $('#delProductModal').modal('show')
    },
    deleteProducts(){
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUS}/admin/product/${vm.temProducts.id}`
      this.$http.delete(api).then((response)=>{
        // console.log(response.data)
        // vm.products = response.data.products
        if(response.data.success){
          $('#delProductModal').modal('hide')
          vm.getProducts()
        } else{
          vm.getProducts()
          console.log('找不到產品')
        }
      })
    },
    uploadFile(){
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload',uploadedFile)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUS}/admin/upload`
      vm.status.uploadloading = true
      this.$http.post(url,formData,{
        headers:{
          'Content-type': 'multipart/form-data'
        }
      }).then((response)=>{
        vm.status.uploadloading = false
        console.log(response.data)
        if(response.data.success){
          // vm.temProducts.imageUrl = response.data.imageUrl
          vm.$set(vm.temProducts,'imageUrl',response.data.imageUrl)
        } else{
          this.$bus.$emit('message:push',response.data.message,'danger')
        }
      })

    }
  },
  created(){
    this.getProducts()
  }
}
</script>