function AvlTree(key){
    this.left = null;
    this.right = null;
    this.depth = 1;
    this.nodeCount = 1;
    this.key = typeof(key) == "number" ? key : null;
}
AvlTree.prototype.getDepth = function(obj){
    if(obj == null)
        return 0;
    return obj.depth;
}
AvlTree.prototype.update = function(){
    this.depth = 1;
    this.nodeCount = 1;
    if(this.left != null){
        this.depth = this.left.depth + 1;
        this.nodeCount += this.left.nodeCount;
    }
    if(this.right != null){
        if(this.depth <= this.right.depth)
            this.depth = this.right.depth + 1;
        this.nodeCount += this.right.nodeCount;
    }
    return;
}
AvlTree.prototype.rotateRight = function(){
    var preKey = this.key;
    var preRight = this.right;
    this.key = this.left.key;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = preRight;
    this.right.key = preKey;
    this.right.update();
    this.update();
    return;
}
AvlTree.prototype.rotateLeft = function(){
    var preKey = this.key;
    var preLeft = this.left;
    this.key = this.right.key;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = preLeft;
    this.left.key = preKey;
    this.left.update();
    this.update();
    return;
}
AvlTree.prototype.balance = function(){
    var depthL = this.getDepth(this.left);
    var depthR = this.getDepth(this.right);
    if(depthL > depthR+1){
        var depthLL = this.getDepth(this.left.left);
        var depthLR = this.getDepth(this.left.right);
        if(depthLL < depthLR)
            this.left.rotateLeft();
        this.rotateRight();
    }
    else if(depthR > depthL+1){
        var depthRL = this.getDepth(this.right.left);
        var depthRR = this.getDepth(this.right.right);
        if(depthRR < depthRL)
            this.right.rotateRight();
        this.rotateLeft();
    }
}
AvlTree.prototype.compare = function(a, b){
    if(a < b)
        return -1;
    if(a > b)
        return 1;
    return 0;
}
AvlTree.prototype.insert = function(key){
    var rst = this.compare(key, this.key);
    if(rst == 0){
        
        return false;
    }
    var ret = false;
    if(rst == -1){
        if(this.left == null){
            this.left = new AvlTree(key);
            ret = true;
        }
        else{
            ret = this.left.insert(key);
            if(ret)
                this.balance();
        }
    }
    else if(rst == 1){
        if(this.right == null){
            this.right = new AvlTree(key);
            ret = true;
        }
        else{
            ret = this.right.insert(key);
            if(ret)
                this.balance();
        }
    }
    if(ret)
        this.update();
    return ret;
}
AvlTree.prototype.erase = function(key, _parent_){
    var rst = this.compare(key, this.key);
    if(rst == 0){
        if(this.left == null && this.right == null){
            if(this == _parent_.left)
                _parent_.left = null;
            else
                _parent_.right = null;
            return;
        } 
        var depthL = this.getDepth(this.left);
        var depthR = this.getDepth(this.right);
        if(depthL >= depthR){
            var depthLL = this.getDepth(this.left.left);
            var depthLR = this.getDepth(this.left.right);
            if(depthLL < depthLR)
                this.left.rotateLeft();
            this.rotateRight();
            this.right.erase(key, this);
        }
        else{
            var depthRL = this.getDepth(this.right.left);
            var depthRR = this.getDepth(this.right.right);
            if(depthRR < depthRL)
                this.right.rotateRight();
            this.rotateLeft();
            this.left.erase(key, this);
        }
    }
    if(rst == -1)
        this.left.erase(key, this);
    if(rst == 1)
        this.right.erase(key, this);
    this.balance();
}
AvlTree.prototype.sort = function(){
    var ret = [];
    if(this.left != null)
        ret = ret.concat(this.left.sort());
    ret = ret.concat(this.key);
    if(this.right != null)
        ret = ret.concat(this.right.sort());
    return ret;
}
AvlTree.prototype.findByRank = function(k){
    var leftCount = this.left == null ? 0 : this.left.nodeCount;
    if(leftCount == k)
        return this;
    if(leftCount < k)
        return this.right.findByRank(k-leftCount-1);
    if(leftCount > k)
        return this.left.findByRank(k);
}
AvlTree.prototype.findByKey = function(k){
    var rst = this.compare(k, this.key);
    if(rst == 0)
        return this;
    if(rst == -1)
        return this.left.findByKey(k);
    if(rst == 1)
        return this.right.findByKey(k);
}



