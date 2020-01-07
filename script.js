var newitem=[];

Vue.component('list-item',{
  template: "#list-item",
  props: ["item","newitem"],
  data(){
    return {
      open: false
    }
  },
  methods: {
    copyitem(item){
      if (vm.newitem.length == 0 ){
        vm.newitem.push(JSON.parse(JSON.stringify(item)))
        this.open=!(this.open)
      }
      else if (vm.newitem.length > 0){
        let check = vm.newitem.find(i => i.title == item.title)
        if (check == undefined){
          vm.newitem.push(JSON.parse(JSON.stringify(item)))
          this.open=!(this.open)
        }
        else {
          this.Save(item)
        }
      }
    },
    Save(item){
      for (let i=0 ;i<=vm.newitem.length ;i++){
        let VmItem = vm.newitem[i]
        if (VmItem){      
          // 如果VmItem存在  (需要此判斷，不然不存在會報錯)
          if (VmItem.title == item.title){
            // VmItem.date = item.date
            // VmItem.image = item.image
            // VmItem.comment = item.comment
            // VmItem.star = item.star
            // VmItem.complete = item.complete
            ////////////////////////////////////////////
            Object.assign(VmItem,item)
            this.open=!(this.open)
          }
        }
      }
    },
    Cancel(item){
      for (let i=0 ;i<=vm.newitem.length ;i++){
        let VmItem = vm.newitem[i]
        if (VmItem){    
          // 如果VmItem存在  (需要此判斷，不然不存在會報錯)
          if (VmItem.title == item.title){
            // this.item.date = VmItem.date
            // this.item.image = VmItem.image    
            // this.item.comment = VmItem.comment 
            // this.item.star =  VmItem.star
            // this.item.complete = VmItem.complete    
            ///////////////////////////////////////////////
            Object.assign(item,VmItem)
            this.open=!(this.open)
          }
        }
      }
    },
    onFileChange(_e) {
      const file = event.target.files.item(0); //取得File物件
      const reader = new FileReader(); //建立FileReader 監聽 Load 事件
      reader.addEventListener('load',this.imageLoader);
      reader.readAsDataURL(file);
    },
    imageLoader(_e){
      this.item.image=event.target.result;
    },
  }
})

// Vue.mixin({
//   methods: {
//     getDate(text){
//       return text
//     }
//   },
// })

var vm = new Vue({
  el: "#app",
  data: {
    items:[ 
      {
        title: "上課",
        date: "",
        image: "data:image/jpeg;base64,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",
        comment: "",
        star: false,
        complete: false
      },{
        title: "上班",
        date: "",
        image: "",
        comment: "",
        star: false,
        complete: false
      },{
        title: "放假",
        date: "",
        image: "",
        comment: "",
        star: false,
        complete: false
      },{
        title: "爬山",
        date: "",
        image: "",
        comment: "",
        star: false,
        complete: false
      },{
        title: "跑步",
        date: "",
        image: "",
        comment: "",
        star: false,
        complete: false
      }
    ],
    newitem: newitem,

  },
  computed: {
    orderedItems(){
      return this.items.sort((a,b)=>{
        let A = (a.star?-10000:0) + (a.complete?20000:0)
        let B = (b.star?-10000:0) + (b.complete?20000:0)
        if (A>B)
          return 1
        else if(A==B)
          return 0
        else 
          return -1
      })
    },
  },
  methods: {
    addNewItem(){
      let TaskTitle = document.getElementById('tasktitle').value;
      if (TaskTitle.length == 0){
        alert("Please Enter A Title");
        document.getElementById('tasktitle').focus();
      }
      else {
        let check = this.items.find(i => i.title == TaskTitle)
        if (check == undefined){
          this.items.unshift({
            title: TaskTitle,
            date: "",
            comment: "",
            star: false,
            complete: false
          })          
        }
        else {
          alert("This Title Already Exists");
          document.getElementById('tasktitle').focus();
        }
        document.getElementById('tasktitle').value="";        
      }
    },
  }
})

